import { Injectable, signal, computed } from '@angular/core';
import { Square } from '../models/square.model';
import { SupabaseBoardRepository } from '../data-sources/board.repository';
import { supabase } from '../data-sources/supabase.client';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private repo = new SupabaseBoardRepository();
  private gameId = '5759eb9e-66a6-48f0-9b2b-775df3b100b2';

  gridSize = signal<number>(10);
  squares = signal<Square[]>([]);
  adminMode = signal<boolean>(false);

  rows = computed(() => Array.from({ length: this.gridSize() }, (_, i) => i));
  cols = computed(() => Array.from({ length: this.gridSize() }, (_, i) => i));

  pendingRequests = computed(() => {
    const all = this.squares();
    console.log('All squares in pendingRequests:', all);
    const pending = all.filter((s: Square) => s.status?.toLowerCase() === 'pending');
    console.log('pendingRequests computed:', pending);
    return pending;
  });
  approvedSquares = computed(() => {
    const all = this.squares();
    console.log('All squares in approvedSquares:', all);
    const approved = all.filter((s: Square) => s.status?.toLowerCase() === 'approved');
    console.log('approvedSquares computed:', approved);
    return approved;
  });

  async loadSquares() {
    const squares = await this.repo.listSquares(this.gameId);
    console.log('Loaded squares:', squares);
    this.squares.set([...squares]); // Force signal update with new array reference
  }

  async initBoard(size: number, gameId?: string) {
    this.gridSize.set(size);
    if (gameId) {
      this.gameId = gameId;
    }
    await this.loadSquares();
  }

  setGameId(gameId: string) {
    this.gameId = gameId;
  }

  async requestSquare(row: number, col: number, name: string, email: string, userId?: string) {
    // Original method - unchanged for backward compatibility
    const square = this.squares().find((s: Square) => Number(s.row_idx) === row && Number(s.col_idx) === col);
    if (square && square.status === 'empty') {
      const updated: Square = {
        ...square,
        status: 'pending',
        name,
        email,
        user_id: userId,
        requestedAt: new Date().toISOString(),
      };
      await this.repo.updateSquare(updated, this.gameId);

      // Fetch game info for admin notification
      const game = await this.repo.getGameById(this.gameId);
      console.log('[requestSquare] getGameById result:', game);
      const adminEmail = game?.owner_email;
      const adminName = game?.owner_name || 'Admin';

      // Enqueue email to admin if available
      if (adminEmail) {
        try {
          await this.enqueueEmail(
            'square_requested_ack',
            adminEmail,
            adminName,
            this.gameId,
            square.id,
            { row_idx: square.row_idx, col_idx: square.col_idx, player_name: name, player_email: email }
          );
          console.log('[requestSquare] Admin notification email enqueued successfully');
        } catch (err) {
          console.error('[requestSquare] Failed to enqueue admin email:', err);
        }
      }

      await this.loadSquares();
    } else {
      console.warn('[requestSquare] Square not found or not empty:', square);
    }
  }

  async requestGrowthSquare(row: number, col: number, name: string, email: string, userId?: string, friendEmail?: string) {
    // Growth mode method - requires authentication and handles referrals
    if (!userId) {
      console.warn('[requestGrowthSquare] Growth mode requires authenticated user');
      return;
    }

    // Validate invite play requirements if friendEmail is provided
    if (friendEmail) {
      const validationResult = await this.validateInvitePlay(friendEmail, userId, this.gameId);
      if (!validationResult.isValid) {
        throw new Error(validationResult.message);
      }
    }

    const square = this.squares().find((s: Square) => Number(s.row_idx) === row && Number(s.col_idx) === col);
    if (square && square.status === 'empty') {
      const updated: Square = {
        ...square,
        status: 'pending',
        name,
        email,
        user_id: userId,
        requestedAt: new Date().toISOString(),
      };
      await this.repo.updateSquare(updated, this.gameId);

      // Fetch game info for admin notification
      const game = await this.repo.getGameById(this.gameId);
      console.log('[requestGrowthSquare] getGameById result:', game);
      const adminEmail = game?.owner_email;
      const adminName = game?.owner_name || 'Admin';

      // Enqueue email to admin if available
      if (adminEmail) {
        try {
          await this.enqueueEmail(
            'square_requested_ack',
            adminEmail,
            adminName,
            this.gameId,
            square.id,
            { row_idx: square.row_idx, col_idx: square.col_idx, player_name: name, player_email: email, mode: 'growth' }
          );
          console.log('[requestGrowthSquare] Admin notification email enqueued successfully');
        } catch (err) {
          console.error('[requestGrowthSquare] Failed to enqueue admin email:', err);
        }
      }

      // Handle referral if friendEmail provided
      if (friendEmail) {
        try {
          // Ensure row_idx and col_idx are defined
          if (square.row_idx == null || square.col_idx == null) {
            console.error('[requestGrowthSquare] Square missing coordinates:', square);
            return;
          }

          await this.repo.createReferral({
            game_id: this.gameId,
            square_id: square.id,
            row_idx: square.row_idx,
            col_idx: square.col_idx,
            inviter_user_id: userId,
            inviter_email: email,
            inviter_name: name,
            invite_email: friendEmail,
            reward_type: 'free_square'
          });

          // Also enqueue the invitation email
          await this.enqueueEmail(
            'growth_referral',
            friendEmail,
            undefined,
            this.gameId,
            square.id,
            { inviter_name: name, inviter_email: email, game_id: this.gameId, row_idx: square.row_idx, col_idx: square.col_idx }
          );

          console.log('[requestGrowthSquare] Growth referral created and invitation email enqueued for', friendEmail);
        } catch (err) {
          console.error('[requestGrowthSquare] Failed to create referral:', err);
        }
      }

      await this.loadSquares();
    } else {
      console.warn('[requestGrowthSquare] Square not found or not empty:', square);
    }
  }

  async approve(squareId: string) {
    console.log('[BoardService.approve] Called with squareId:', squareId);
    if (!squareId) {
      console.warn('[BoardService.approve] No squareId provided.');
      return;
    }
    const square = await this.repo.getSquareById(squareId);
    console.log('[BoardService.approve] Fetched square from DB:', square);
    if (square && square.status === 'pending') {
      if (!square.game_id) {
        console.error('[BoardService.approve] ERROR: square.game_id is undefined for squareId:', squareId);
        return;
      }
      const updated: Square = {
        ...square,
        status: 'approved',
        approved_at: new Date().toISOString()
      };
      console.log('[BoardService.approve] Updating square:', updated);
      try {
        if (typeof (this.repo as any).updateSquareByAdmin === 'function') {
          await (this.repo as any).updateSquareByAdmin(updated, square.game_id);
        } else {
          await this.repo.updateSquare(updated, square.game_id);
        }
        console.log('[BoardService.approve] Square updated in DB');
      } catch (err) {
        console.error('[BoardService.approve] Error updating square:', err);
        throw err;
      }
      // Log square.email before enqueueEmail
      console.log('[BoardService.approve] Attempting to enqueue approval email. square.email:', square.email, 'square:', square);
      if (square.email) {
        await this.enqueueEmail(
          'request_approved',
          square.email,
          square.name,
          this.gameId,
          square.id,
          { row_idx: square.row_idx, col_idx: square.col_idx }
        );
      } else {
        console.warn('[BoardService.approve] No email found for square, not sending approval email.');
      }
      await this.loadSquares();
    } else {
      if (!square) {
        console.warn('[BoardService.approve] Square not found for squareId:', squareId);
      } else {
        console.warn('[BoardService.approve] Square not pending:', square);
      }
    }
  }

  async decline(squareId: string) {
    console.log('[BoardService.decline] Called with squareId:', squareId);
    if (!squareId) {
      console.warn('[BoardService.decline] No squareId provided.');
      return;
    }
    const square = await this.repo.getSquareById(squareId);
    console.log('[BoardService.decline] Fetched square from DB:', square);
    if (square && (square.status === 'pending' || square.status === 'approved')) {
      if (!square.game_id) {
        console.error('[BoardService.decline] ERROR: square.game_id is undefined for squareId:', squareId);
        return;
      }
      const updated: Square = {
        ...square,
        status: 'empty',
        name: undefined,
        email: undefined,
        user_id: undefined, // Clear user_id when declining
        requestedAt: undefined,
        approved_at: undefined,
      };
      console.log('[BoardService.decline] Updating square:', updated);
      try {
        if (typeof (this.repo as any).updateSquareByAdmin === 'function') {
          await (this.repo as any).updateSquareByAdmin(updated, square.game_id);
        } else {
          await this.repo.updateSquare(updated, square.game_id);
        }
        console.log('[BoardService.decline] Square updated in DB');
      } catch (err) {
        console.error('[BoardService.decline] Error updating square:', err);
        throw err;
      }
      // Log square.email before enqueueEmail
      console.log('[BoardService.decline] Attempting to enqueue decline email. square.email:', square.email, 'square:', square);
      if (square.email) {
        await this.enqueueEmail(
          'request_denied',
          square.email,
          square.name,
          this.gameId,
          square.id,
          { row_idx: square.row_idx, col_idx: square.col_idx }
        );
      } else {
        console.warn('[BoardService.decline] No email found for square, not sending decline email.');
      }
      await this.loadSquares();
    } else {
      if (!square) {
        console.warn('[BoardService.decline] Square not found for squareId:', squareId);
      } else {
        console.warn('[BoardService.decline] Square not pending/approved:', square);
      }
    }
  }

  // Helper to enqueue email notification
  private async enqueueEmail(type: string, recipient: string, recipient_name: string | undefined, game_id: string, square_id: string, payload: any) {
    try {
      await this.repo.enqueueEmail(type, recipient, recipient_name, game_id, square_id, payload);
    } catch (error) {
      console.error('Failed to enqueue email via repository:', error);
    }
  }

  toggleAdmin() {
    this.adminMode.update(v => !v);
  }

  async resetBoard() {
    await this.loadSquares();
  }

  /**
   * Validates invite play requirements
   * Returns validation result with isValid flag and error message
   */
  async validateInvitePlay(friendEmail: string, userId: string, gameId: string): Promise<{isValid: boolean, message: string}> {
    try {
      // Check 1: Verify the invited email is not tied to an existing user in profiles table
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', friendEmail)
        .limit(1);

      if (profileError) {
        console.error('Error checking existing user profiles:', profileError);
        return { isValid: false, message: 'Unable to validate invitation. Please try again.' };
      }

      if (existingProfile && existingProfile.length > 0) {
        return {
          isValid: false,
          message: 'This email is already registered. Please invite someone who hasn\'t joined yet.'
        };
      }

      // Check 2: Verify the invited email doesn't have a pending referral
      const { data: pendingReferral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('invite_email', friendEmail)
        .eq('status', 'pending')
        .limit(1);

      if (referralError && referralError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error checking pending referrals:', referralError);
        return { isValid: false, message: 'Unable to validate invitation. Please try again.' };
      }

      if (pendingReferral && pendingReferral.length > 0) {
        return {
          isValid: false,
          message: 'This person already has a pending invitation. Please try inviting someone else.'
        };
      }

      // Check 3: Verify the inviting user doesn't already have 3 pending or approved squares for this game
      const { data: userSquares, error: squareError } = await supabase
        .from('squares')
        .select('*')
        .eq('game_id', gameId)
        .eq('user_id', userId)
        .in('status', ['pending', 'approved']);

      if (squareError) {
        console.error('Error checking user squares:', squareError);
        return { isValid: false, message: 'Unable to validate square limit. Please try again.' };
      }

      if (userSquares && userSquares.length >= 3) {
        return {
          isValid: false,
          message: 'You\'ve reached the limit of 3 squares per game. Please join another game to continue playing.'
        };
      }

      return { isValid: true, message: '' };
    } catch (error) {
      console.error('Unexpected error during invite play validation:', error);
      return { isValid: false, message: 'Unable to validate invitation. Please try again.' };
    }
  }

  /**
   * Checks if the current user has a rewarded invite for the current game
   * Returns the referral record if found
   */
  async checkUserPendingInvite(userEmail: string, gameId: string): Promise<any> {
    try {
      console.log('[checkUserPendingInvite] Checking for user:', userEmail, 'in game:', gameId);

      // First, let's check what referrals exist for this email in any status
      const { data: allReferrals, error: allError } = await supabase
        .from('referrals')
        .select('*')
        .eq('invite_email', userEmail)
        .eq('game_id', gameId);

      console.log('[checkUserPendingInvite] All referrals for email:', allReferrals);

      if (allError) {
        console.error('Error checking all referrals:', allError);
      }

      // Check specifically for rewarded status
      const { data: rewardedInvite, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('invite_email', userEmail)
        .eq('game_id', gameId)
        .eq('status', 'rewarded')
        .limit(1);

      console.log('[checkUserPendingInvite] Rewarded invite found:', rewardedInvite);

      if (error) {
        console.error('Error checking user rewarded invite:', error);
        return null;
      }

      // Also check for signed_up status as backup
      if (!rewardedInvite || rewardedInvite.length === 0) {
        console.log('[checkUserPendingInvite] No rewarded invite found, checking for signed_up status...');

        const { data: signedUpInvite, error: signedUpError } = await supabase
          .from('referrals')
          .select('*')
          .eq('invite_email', userEmail)
          .eq('game_id', gameId)
          .eq('status', 'signed_up')
          .limit(1);

        console.log('[checkUserPendingInvite] Signed up invite found:', signedUpInvite);

        if (signedUpError) {
          console.error('Error checking signed up invite:', signedUpError);
          return null;
        }

        return signedUpInvite && signedUpInvite.length > 0 ? signedUpInvite[0] : null;
      }

      return rewardedInvite && rewardedInvite.length > 0 ? rewardedInvite[0] : null;
    } catch (error) {
      console.error('Unexpected error checking rewarded invite:', error);
      return null;
    }
  }

  /**
   * Confirms and assigns an invite square to the user
   * Updates the square to approved and the referral to signed_up
   */
  async confirmInviteSquare(referralId: string, userId: string): Promise<{success: boolean, message: string}> {
    try {
      // Get the referral record
      const { data: referral, error: referralError } = await supabase
        .from('referrals')
        .select('*')
        .eq('id', referralId)
        .limit(1);

      if (referralError || !referral || referral.length === 0) {
        return { success: false, message: 'Referral record not found.' };
      }

      const referralRecord = referral[0];

      // Update the referral status to signed_up and link the user
      const { error: updateReferralError } = await supabase
        .from('referrals')
        .update({
          status: 'signed_up',
          invited_user_id: userId,
          signed_up_at: new Date().toISOString()
        })
        .eq('id', referralId);

      if (updateReferralError) {
        console.error('Error updating referral:', updateReferralError);
        return { success: false, message: 'Failed to update referral status.' };
      }

      // Get the square and update it to approved with the user's info
      const { data: square, error: squareError } = await supabase
        .from('squares')
        .select('*')
        .eq('id', referralRecord.square_id)
        .limit(1);

      if (squareError || !square || square.length === 0) {
        return { success: false, message: 'Square not found.' };
      }

      const squareRecord = square[0];

      // Get user profile for name and email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .limit(1);

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      const userName = user?.user_metadata?.['full_name'] ||
                      user?.user_metadata?.['display_name'] ||
                      user?.user_metadata?.['name'] ||
                      'User';
      const userEmail = user?.email || (profile && profile.length > 0 ? profile[0].email : '');

      // Update square to approved
      const { error: updateSquareError } = await supabase
        .from('squares')
        .update({
          status: 'approved',
          name: userName,
          email: userEmail,
          user_id: userId,
          approved_at: new Date().toISOString()
        })
        .eq('id', referralRecord.square_id);

      if (updateSquareError) {
        console.error('Error updating square:', updateSquareError);
        return { success: false, message: 'Failed to assign square.' };
      }

      // Send confirmation email to the user
      try {
        await this.enqueueEmail(
          'invite_square_assigned',
          userEmail,
          userName,
          referralRecord.game_id,
          referralRecord.square_id,
          {
            row_idx: referralRecord.row_idx,
            col_idx: referralRecord.col_idx,
            inviter_name: referralRecord.inviter_name
          }
        );
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the whole process for email issues
      }

      // Reload squares to reflect changes
      await this.loadSquares();

      return { success: true, message: 'Square successfully assigned!' };
    } catch (error) {
      console.error('Unexpected error confirming invite square:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }

  /**
   * Creates a new referral for the user who just claimed their invite square
   * This allows them to get another free square by inviting a friend
   */
  async createReferralForNewUser(userId: string, gameId: string, userName: string, userEmail: string, friendEmail: string): Promise<{success: boolean, message: string}> {
    try {
      // Validate the friend's email using existing validation
      const validationResult = await this.validateInvitePlay(friendEmail, userId, gameId);
      if (!validationResult.isValid) {
        return { success: false, message: validationResult.message };
      }

      // Find an available empty square for the referral reward
      const { data: emptySquares, error: squareError } = await supabase
        .from('squares')
        .select('*')
        .eq('game_id', gameId)
        .eq('status', 'empty')
        .limit(1);

      if (squareError) {
        console.error('Error finding empty square:', squareError);
        return { success: false, message: 'Unable to find available squares.' };
      }

      if (!emptySquares || emptySquares.length === 0) {
        return { success: false, message: 'No available squares left in this game.' };
      }

      const rewardSquare = emptySquares[0];

      // Create the referral record
      const { error: referralError } = await supabase
        .from('referrals')
        .insert({
          game_id: gameId,
          square_id: rewardSquare.id,
          row_idx: rewardSquare.row_idx,
          col_idx: rewardSquare.col_idx,
          inviter_user_id: userId,
          inviter_email: userEmail,
          inviter_name: userName,
          invite_email: friendEmail,
          reward_type: 'free_square'
        });

      if (referralError) {
        console.error('Error creating referral:', referralError);
        return { success: false, message: 'Failed to create referral.' };
      }

      // Send invitation email to the friend
      try {
        await this.enqueueEmail(
          'growth_referral',
          friendEmail,
          undefined,
          gameId,
          rewardSquare.id,
          {
            inviter_name: userName,
            inviter_email: userEmail,
            game_id: gameId,
            row_idx: rewardSquare.row_idx,
            col_idx: rewardSquare.col_idx
          }
        );
      } catch (emailError) {
        console.error('Failed to send invitation email:', emailError);
        // Don't fail the whole process for email issues
      }

      return { success: true, message: `Invitation sent to ${friendEmail}! You'll get a free square when they sign up.` };
    } catch (error) {
      console.error('Unexpected error creating referral:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }
}
