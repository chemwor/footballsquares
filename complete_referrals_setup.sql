-- Complete SQL setup for referrals and auto-approval functionality
-- Run this after games and auth.users tables are created

-- First, create the squares table (must come before referrals due to foreign key)
CREATE TABLE IF NOT EXISTS public.squares (
  id uuid not null default gen_random_uuid (),
  game_id uuid not null,
  row_idx integer not null,
  col_idx integer not null,
  status text not null default 'empty'::text,
  name text null,
  email text null,
  requested_by uuid null,
  requested_at timestamp with time zone null,
  approved_at timestamp with time zone null,
  user_id uuid null,
  won_periods integer[] null default '{}'::integer[],
  constraint squares_pkey primary key (id),
  constraint uq_square unique (game_id, row_idx, col_idx),
  constraint squares_game_id_fkey foreign KEY (game_id) references games (id) on delete CASCADE,
  constraint squares_requested_by_fkey foreign KEY (requested_by) references auth.users (id) on delete set null,
  constraint squares_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete set null,
  constraint squares_status_check check (
    (
      status = any (
        array['empty'::text, 'pending'::text, 'approved'::text]
      )
    )
  )
) TABLESPACE pg_default;

-- Indexes for squares
CREATE INDEX IF NOT EXISTS idx_squares_game ON public.squares USING btree (game_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_squares_state ON public.squares USING btree (game_id, status) TABLESPACE pg_default;

-- Now create the referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid not null default gen_random_uuid (),
  game_id uuid not null,
  square_id uuid not null,
  row_idx integer not null,
  col_idx integer not null,
  inviter_user_id uuid not null,
  inviter_email text not null,
  inviter_name text not null,
  invite_email text not null,
  invited_user_id uuid null,
  invited_name text null,
  status text not null default 'pending'::text,
  created_at timestamp with time zone not null default now(),
  invited_at timestamp with time zone null,
  signed_up_at timestamp with time zone null,
  reward_granted_at timestamp with time zone null,
  reward_type text null default 'free_square'::text,
  reward_square_id uuid null,
  reward_details jsonb null,
  email_queue_id uuid null,
  metadata jsonb null default '{}'::jsonb,
  constraint referrals_pkey primary key (id),
  constraint uq_referral_invite unique (game_id, square_id, invite_email),
  constraint referrals_invited_user_id_fkey foreign KEY (invited_user_id) references auth.users (id) on delete set null,
  constraint referrals_inviter_user_id_fkey foreign KEY (inviter_user_id) references auth.users (id) on delete CASCADE,
  constraint referrals_reward_square_id_fkey foreign KEY (reward_square_id) references squares (id) on delete set null,
  constraint referrals_game_id_fkey foreign KEY (game_id) references games (id) on delete CASCADE,
  constraint referrals_square_id_fkey foreign KEY (square_id) references squares (id) on delete CASCADE,
  constraint referrals_email_format_check check (
    (
      invite_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'::text
    )
  ),
  constraint referrals_status_check check (
    (
      status = any (
        array[
          'pending'::text,
          'sent'::text,
          'signed_up'::text,
          'rewarded'::text,
          'expired'::text,
          'cancelled'::text
        ]
      )
    )
  ),
  constraint referrals_reward_type_check check (
    (
      reward_type = any (
        array[
          'free_square'::text,
          'credit'::text,
          'discount'::text,
          'points'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

-- Indexes for referrals
CREATE INDEX IF NOT EXISTS idx_referrals_game_id ON public.referrals USING btree (game_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_referrals_inviter_user ON public.referrals USING btree (inviter_user_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_referrals_invite_email ON public.referrals USING btree (invite_email) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_referrals_status ON public.referrals USING btree (status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_referrals_created_at ON public.referrals USING btree (created_at) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_referrals_game_status ON public.referrals USING btree (game_id, status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_referrals_inviter_status ON public.referrals USING btree (inviter_user_id, status) TABLESPACE pg_default;

-- Function to attach user from email (for squares table)
CREATE OR REPLACE FUNCTION tg_squares_attach_user_from_email()
RETURNS TRIGGER AS $$
DECLARE
    user_uuid uuid;
BEGIN
    -- If email is provided but user_id is null, try to find the user
    IF NEW.email IS NOT NULL AND NEW.user_id IS NULL THEN
        SELECT id INTO user_uuid
        FROM auth.users
        WHERE email = NEW.email
        LIMIT 1;

        IF user_uuid IS NOT NULL THEN
            NEW.user_id := user_uuid;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to notify host when square is created (placeholder - customize as needed)
CREATE OR REPLACE FUNCTION tg_square_created_notify_host()
RETURNS TRIGGER AS $$
BEGIN
    -- Add your notification logic here
    -- This could send an email, create a notification record, etc.
    RAISE NOTICE 'New square created: Game %, Row %, Col %', NEW.game_id, NEW.row_idx, NEW.col_idx;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to match referrals when users sign up
CREATE OR REPLACE FUNCTION tg_referrals_match_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- When a new user is created, check if their email matches any pending referrals
    UPDATE public.referrals
    SET
        invited_user_id = NEW.id,
        invited_name = COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        signed_up_at = now(),
        status = 'signed_up'
    WHERE
        invite_email = NEW.email
        AND status IN ('pending', 'sent')
        AND invited_user_id IS NULL;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process referral rewards and auto-approve squares
CREATE OR REPLACE FUNCTION tg_referrals_process_reward()
RETURNS TRIGGER AS $$
DECLARE
    available_square_id uuid;
BEGIN
    -- Only process when status changes to 'signed_up'
    IF OLD.status != 'signed_up' AND NEW.status = 'signed_up' THEN

        -- First, approve the original square that was claimed with this invite
        UPDATE squares
        SET
            status = 'approved',
            approved_at = now()
        WHERE id = NEW.square_id
            AND game_id = NEW.game_id
            AND status = 'pending';

        -- Log the approval
        RAISE NOTICE 'Auto-approved original invited square % for referral % (invited user signed up)', NEW.square_id, NEW.id;

        -- For free_square reward type, find an available square in the same game as reward for inviter
        IF NEW.reward_type = 'free_square' THEN
            -- Find a random empty square in the same game
            SELECT id INTO available_square_id
            FROM squares
            WHERE game_id = NEW.game_id
                AND status = 'empty'
            ORDER BY RANDOM()
            LIMIT 1;

            -- If we found an available square, assign it
            IF available_square_id IS NOT NULL THEN
                -- Update the square to be owned by the inviter
                UPDATE squares
                SET
                    status = 'approved',
                    user_id = NEW.inviter_user_id,
                    name = NEW.inviter_name,
                    email = NEW.inviter_email,
                    approved_at = now()
                WHERE id = available_square_id;

                -- Update the referral with reward details
                NEW.reward_square_id := available_square_id;
                NEW.reward_granted_at := now();
                NEW.status := 'rewarded';
                NEW.reward_details := jsonb_build_object(
                    'square_id', available_square_id,
                    'granted_at', now(),
                    'type', 'free_square'
                );
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for squares table
CREATE TRIGGER tg_squares_attach_user_from_email
    BEFORE INSERT OR UPDATE ON squares
    FOR EACH ROW
    EXECUTE FUNCTION tg_squares_attach_user_from_email();

CREATE TRIGGER tg_square_created_notify_host
    AFTER INSERT ON squares
    FOR EACH ROW
    EXECUTE FUNCTION tg_square_created_notify_host();

-- Create triggers for referrals table
CREATE TRIGGER trg_referrals_match_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION tg_referrals_match_signup();

CREATE TRIGGER trg_referrals_process_reward
    BEFORE UPDATE ON referrals
    FOR EACH ROW
    EXECUTE FUNCTION tg_referrals_process_reward();
