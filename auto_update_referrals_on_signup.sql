-- Trigger function to automatically update referral status when a user signs up
CREATE OR REPLACE FUNCTION tg_auto_update_referrals_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY definer
AS $$
BEGIN
  -- Update any pending referrals for the new user's email
  UPDATE public.referrals
  SET
    status = 'signed_up',
    invited_user_id = NEW.id,
    signed_up_at = NOW()
  WHERE
    invite_email = NEW.email
    AND status = 'pending';

  -- Also update the corresponding square to approved if referral was updated
  UPDATE public.squares
  SET
    status = 'approved',
    user_id = NEW.id,
    approved_at = NOW()
  WHERE
    id IN (
      SELECT square_id
      FROM public.referrals
      WHERE invite_email = NEW.email
        AND status = 'signed_up'
        AND invited_user_id = NEW.id
    );

  RETURN NEW;
END;
$$;

-- Create trigger on auth.users table insert
DROP TRIGGER IF EXISTS trg_auto_update_referrals_on_signup ON auth.users;
CREATE TRIGGER trg_auto_update_referrals_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION tg_auto_update_referrals_on_signup();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION tg_auto_update_referrals_on_signup() TO authenticated;
GRANT EXECUTE ON FUNCTION tg_auto_update_referrals_on_signup() TO anon;
