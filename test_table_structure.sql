-- Test the referrals table structure
create table public.referrals (
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

-- Test the squares table structure
create table public.squares (
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
