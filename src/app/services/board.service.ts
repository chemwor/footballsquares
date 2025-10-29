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

  async requestSquare(row: number, col: number, name: string, email: string, userId?: string) {
    const square = this.squares().find((s: Square) => Number(s.row_idx) === row && Number(s.col_idx) === col);
    if (square && square.status === 'empty') {
      const updated: Square = {
        ...square,
        status: 'pending',
        name,
        email,
        user_id: userId, // Include the user ID if provided
        requestedAt: new Date().toISOString(),
      };
      await this.repo.updateSquare(updated, this.gameId);
      // Fetch game info (with owner_email and owner_name from games_with_owner view)
      const game = await this.repo.getGameById(this.gameId); // Should now return owner_email and owner_name
      const adminEmail = game?.owner_email;
      const adminName = game?.owner_name || 'Admin';
      // Enqueue email to admin if available
      if (adminEmail) {
        await this.enqueueEmail(
          'square_requested_ack',
          adminEmail,
          adminName,
          this.gameId,
          square.id,
          { row_idx: square.row_idx, col_idx: square.col_idx, player_name: name, player_email: email }
        );
      }
      await this.loadSquares();
    }
  }

  // Helper to enqueue email notification
  private async enqueueEmail(type: string, recipient: string, recipient_name: string | undefined, game_id: string, square_id: string, payload: any) {
    // Use Supabase JS client directly for the insert
    // @ts-ignore
    const supabase = this.repo.supabase || (window as any).supabase; // fallback if repo exposes supabase
    if (!supabase) {
      console.error('Supabase client not available for email_queue insert');
      return;
    }
    const { error } = await supabase.from('email_queue').insert([
      {
        type,
        recipient,
        recipient_name: recipient_name || 'Player',
        game_id,
        square_id,
        payload,
        event_type: type
      }
    ]);
    if (error) {
      console.error('Failed to enqueue email:', error);
    }
  }

  async approve(squareId: string) {
    const square = this.squares().find((s: Square) => s.id === squareId);
    if (square && square.status === 'pending') {
      const updated: Square = {
        ...square,
        status: 'approved',
        approved_at: new Date().toISOString()
      };
      console.log('BoardService.approve sending to repo:', updated, 'gameId:', this.gameId);
      // Use updateSquareByAdmin for admin actions
      if (typeof (this.repo as any).updateSquareByAdmin === 'function') {
        await (this.repo as any).updateSquareByAdmin(updated, this.gameId);
      } else {
        await this.repo.updateSquare(updated, this.gameId);
      }
      // Enqueue approval email
      if (square.email) {
        await this.enqueueEmail(
          'request_approved',
          square.email,
          square.name,
          this.gameId,
          square.id,
          { row_idx: square.row_idx, col_idx: square.col_idx }
        );
      }
      await this.loadSquares();
    }
  }

  async decline(squareId: string) {
    const square = this.squares().find((s: Square) => s.id === squareId);
    if (square && (square.status === 'pending' || square.status === 'approved')) {
      const updated: Square = {
        ...square,
        status: 'empty',
        name: undefined,
        email: undefined,
        user_id: undefined, // Clear user_id when declining
        requestedAt: undefined,
        approved_at: undefined,
      };
      console.log('BoardService.decline sending to repo:', updated, 'gameId:', this.gameId);
      // Use updateSquareByAdmin for admin actions
      if (typeof (this.repo as any).updateSquareByAdmin === 'function') {
        await (this.repo as any).updateSquareByAdmin(updated, this.gameId);
      } else {
        await this.repo.updateSquare(updated, this.gameId);
      }
      // Enqueue decline email
      if (square.email) {
        await this.enqueueEmail(
          'request_denied',
          square.email,
          square.name,
          this.gameId,
          square.id,
          { row_idx: square.row_idx, col_idx: square.col_idx }
        );
      }
      await this.loadSquares();
    }
  }

  toggleAdmin() {
    this.adminMode.update(v => !v);
  }

  async resetBoard() {
    await this.loadSquares();
  }
}
