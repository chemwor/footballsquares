-- Referrals table for growth mode functionality
-- This table tracks invitations sent through the growth square feature
-- and manages the referral rewards system

CREATE TABLE public.referrals (
    id uuid NOT NULL DEFAULT gen_random_uuid(),

    -- Game and Square Context
    game_id uuid NOT NULL,
    square_id uuid NOT NULL,
    row_idx integer NOT NULL,
    col_idx integer NOT NULL,

    -- Inviter Information (person who sent the invitation)
    inviter_user_id uuid NOT NULL,
    inviter_email text NOT NULL,
    inviter_name text NOT NULL,

    -- Invitee Information (person being invited)
    invite_email text NOT NULL,
    invited_user_id uuid NULL, -- Set when the invitee signs up
    invited_name text NULL, -- Set when the invitee signs up

    -- Referral Status and Tracking
    status text NOT NULL DEFAULT 'pending'::text,

    -- Timestamps
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    invited_at timestamp with time zone NULL, -- When invitation email was sent
    signed_up_at timestamp with time zone NULL, -- When invitee created account
    reward_granted_at timestamp with time zone NULL, -- When inviter received reward

    -- Reward Information
    reward_type text NULL DEFAULT 'free_square'::text,
    reward_square_id uuid NULL, -- If reward is a free square, reference to it
    reward_details jsonb NULL, -- Flexible field for other reward types

    -- Email Queue Reference (for tracking email status)
    email_queue_id uuid NULL,

    -- Metadata
    metadata jsonb NULL DEFAULT '{}'::jsonb,

    -- Constraints
    CONSTRAINT referrals_pkey PRIMARY KEY (id),
    CONSTRAINT uq_referral_invite UNIQUE (game_id, square_id, invite_email),

    -- Foreign Keys
    CONSTRAINT referrals_game_id_fkey
        FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
    CONSTRAINT referrals_square_id_fkey
        FOREIGN KEY (square_id) REFERENCES squares (id) ON DELETE CASCADE,
    CONSTRAINT referrals_inviter_user_id_fkey
        FOREIGN KEY (inviter_user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    CONSTRAINT referrals_invited_user_id_fkey
        FOREIGN KEY (invited_user_id) REFERENCES auth.users (id) ON DELETE SET NULL,
    CONSTRAINT referrals_reward_square_id_fkey
        FOREIGN KEY (reward_square_id) REFERENCES squares (id) ON DELETE SET NULL,

    -- Check Constraints
    CONSTRAINT referrals_status_check CHECK (
        status = ANY (ARRAY[
            'pending'::text,      -- Invitation created, not yet sent
            'sent'::text,         -- Invitation email sent
            'signed_up'::text,    -- Invitee created account
            'rewarded'::text,     -- Inviter received reward
            'expired'::text,      -- Invitation expired
            'cancelled'::text     -- Invitation cancelled
        ])
    ),
    CONSTRAINT referrals_reward_type_check CHECK (
        reward_type = ANY (ARRAY[
            'free_square'::text,
            'credit'::text,
            'discount'::text,
            'points'::text
        ])
    ),
    CONSTRAINT referrals_email_format_check CHECK (
        invite_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    )
) TABLESPACE pg_default;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_referrals_game_id
    ON public.referrals USING btree (game_id) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_referrals_inviter_user
    ON public.referrals USING btree (inviter_user_id) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_referrals_invite_email
    ON public.referrals USING btree (invite_email) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_referrals_status
    ON public.referrals USING btree (status) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_referrals_created_at
    ON public.referrals USING btree (created_at) TABLESPACE pg_default;

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_referrals_game_status
    ON public.referrals USING btree (game_id, status) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_referrals_inviter_status
    ON public.referrals USING btree (inviter_user_id, status) TABLESPACE pg_default;

-- Row Level Security (RLS) Policies
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own referrals (as inviter)
CREATE POLICY "Users can view their own referrals"
    ON public.referrals FOR SELECT
    USING (auth.uid() = inviter_user_id);

-- Policy: Users can insert referrals for themselves
CREATE POLICY "Users can create referrals"
    ON public.referrals FOR INSERT
    WITH CHECK (auth.uid() = inviter_user_id);

-- Policy: System can update referrals (for processing)
CREATE POLICY "System can update referrals"
    ON public.referrals FOR UPDATE
    USING (true); -- This will need more specific logic based on your auth setup

-- Policy: Game owners can view referrals for their games
CREATE POLICY "Game owners can view game referrals"
    ON public.referrals FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM games
            WHERE games.id = referrals.game_id
            AND games.owner_id = auth.uid()
        )
    );

-- Trigger Functions

-- Function to automatically set invited_user_id when someone signs up with the invited email
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

-- Trigger on auth.users for new signups
CREATE TRIGGER trg_referrals_match_signup
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION tg_referrals_match_signup();

-- Function to process referral rewards
CREATE OR REPLACE FUNCTION tg_referrals_process_reward()
RETURNS TRIGGER AS $$
DECLARE
    available_square_id uuid;
BEGIN
    -- Only process when status changes to 'signed_up'
    IF OLD.status != 'signed_up' AND NEW.status = 'signed_up' THEN

        -- For free_square reward type, find an available square in the same game
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

-- Trigger to automatically process rewards
CREATE TRIGGER trg_referrals_process_reward
    BEFORE UPDATE ON public.referrals
    FOR EACH ROW
    EXECUTE FUNCTION tg_referrals_process_reward();

-- Function to clean up expired referrals (run this periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_referrals()
RETURNS integer AS $$
DECLARE
    expired_count integer;
BEGIN
    -- Mark referrals as expired if they're older than 30 days and still pending/sent
    UPDATE public.referrals
    SET status = 'expired'
    WHERE
        status IN ('pending', 'sent')
        AND created_at < (now() - INTERVAL '30 days');

    GET DIAGNOSTICS expired_count = ROW_COUNT;

    RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comments for documentation
COMMENT ON TABLE public.referrals IS 'Tracks referral invitations for growth mode squares and manages reward distribution';
COMMENT ON COLUMN public.referrals.game_id IS 'Reference to the game where the referral originated';
COMMENT ON COLUMN public.referrals.square_id IS 'Reference to the square that triggered the referral';
COMMENT ON COLUMN public.referrals.inviter_user_id IS 'User who sent the invitation';
COMMENT ON COLUMN public.referrals.invite_email IS 'Email address of the person being invited';
COMMENT ON COLUMN public.referrals.status IS 'Current status of the referral process';
COMMENT ON COLUMN public.referrals.reward_type IS 'Type of reward to grant when referral completes';
COMMENT ON COLUMN public.referrals.metadata IS 'Flexible JSON field for additional referral data';
