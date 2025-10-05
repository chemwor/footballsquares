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

  async requestSquare(row: number, col: number, name: string, email: string) {
    const square = this.squares().find((s: Square) => Number(s.row_idx) === row && Number(s.col_idx) === col);
    if (square && square.status === 'empty') {
      const updated: Square = {
        ...square,
        status: 'pending',
        name,
        email,
        requestedAt: new Date().toISOString(),
      };
      await this.repo.updateSquare(updated, this.gameId);
      await this.loadSquares();
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
