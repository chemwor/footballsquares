-- Add 'completed' status to the referrals status check constraint
ALTER TABLE public.referrals
DROP CONSTRAINT IF EXISTS referrals_status_check;

ALTER TABLE public.referrals
ADD CONSTRAINT referrals_status_check CHECK (
  status = ANY (
    ARRAY[
      'pending'::text,
      'sent'::text,
      'signed_up'::text,
      'rewarded'::text,
      'completed'::text,
      'expired'::text,
      'cancelled'::text
    ]
  )
);

-- Add index for the new completed status
CREATE INDEX IF NOT EXISTS idx_referrals_completed ON public.referrals USING btree (status) WHERE status = 'completed';
