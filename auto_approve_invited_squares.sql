-- Function to automatically approve squares when invited users sign up
CREATE OR REPLACE FUNCTION tg_referrals_approve_invited_square()
RETURNS TRIGGER AS $$
BEGIN
    -- Only process when status changes from 'pending' to 'signed_up'
    IF OLD.status != 'signed_up' AND NEW.status = 'signed_up' THEN

        -- Approve the original square that was claimed with this invite
        UPDATE squares
        SET
            status = 'approved',
            approved_at = now()
        WHERE id = NEW.square_id
            AND game_id = NEW.game_id
            AND status = 'pending';

        -- Log the approval
        RAISE NOTICE 'Auto-approved square % for referral % (invited user signed up)', NEW.square_id, NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-approve squares when invited users sign up
CREATE TRIGGER trg_referrals_approve_invited_square
    BEFORE UPDATE ON public.referrals
    FOR EACH ROW
    EXECUTE FUNCTION tg_referrals_approve_invited_square();
