-- Function to assign a selected square to an invited user
-- This function runs with elevated permissions to bypass RLS
CREATE OR REPLACE FUNCTION assign_invite_square(
  p_referral_id UUID,
  p_user_id UUID,
  p_game_id UUID,
  p_row_idx INTEGER,
  p_col_idx INTEGER,
  p_user_name TEXT,
  p_user_email TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to bypass RLS
AS $$
DECLARE
  v_square_id UUID;
  v_referral_record RECORD;
  v_result JSON;
BEGIN
  -- Get the referral record
  SELECT * INTO v_referral_record
  FROM public.referrals
  WHERE id = p_referral_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Referral record not found.');
  END IF;

  -- Get the selected square
  SELECT id INTO v_square_id
  FROM public.squares
  WHERE game_id = p_game_id
    AND row_idx = p_row_idx
    AND col_idx = p_col_idx
    AND status = 'empty';

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Selected square is not available.');
  END IF;

  -- Update the selected square to approved with user's info
  UPDATE public.squares
  SET
    status = 'approved',
    name = p_user_name,
    email = p_user_email,
    user_id = p_user_id,
    approved_at = NOW()
  WHERE id = v_square_id;

  -- Update the referral status to completed
  UPDATE public.referrals
  SET
    status = 'completed',
    invited_user_id = p_user_id,
    signed_up_at = NOW(),
    reward_granted_at = NOW()
  WHERE id = p_referral_id;

  -- Return success
  RETURN json_build_object(
    'success', true,
    'message', format('Square [%s, %s] successfully assigned to you!', p_row_idx, p_col_idx),
    'square_id', v_square_id
  );

EXCEPTION WHEN OTHERS THEN
  -- Return error
  RETURN json_build_object(
    'success', false,
    'message', 'An error occurred while assigning the square: ' || SQLERRM
  );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION assign_invite_square(UUID, UUID, UUID, INTEGER, INTEGER, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION assign_invite_square(UUID, UUID, UUID, INTEGER, INTEGER, TEXT, TEXT) TO anon;
