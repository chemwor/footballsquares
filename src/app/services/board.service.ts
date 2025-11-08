import { Injectable, signal, computed } from '@angular/core';
import { Square } from '../models/square.model';
import { SupabaseBoardRepository } from '../data-sources/board.repository';

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
}
