import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../data-sources/supabase.client';

@Component({
  selector: 'sq-admin-board-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="board-container">
      <div class="axis-label x-axis">{{ gameData?.team2_name || 'Eagles' }}</div>
      <div class="axis-label y-axis">{{ gameData?.team1_name || 'Falcons' }}</div>
      <div class="board" [style.--cols]="gridSize">
        <div class="header corner"></div>
        <div *ngFor="let col of cols" class="header">{{col}}</div>
        <ng-container *ngFor="let row of rows">
          <div class="header">{{row}}</div>
          <ng-container *ngFor="let col of cols">
            <div
              class="cell"
              [ngClass]="getCellClass(row, col)"
            >
              <ng-container [ngSwitch]="getCellStatus(row, col)">
                <span *ngSwitchCase="'empty'">-</span>
                <span *ngSwitchCase="'pending'" class="user-info">
                  <span class="pill pending">Pending</span>
                  <span class="name">{{getSquareName(row, col)}}</span>
                </span>
                <span *ngSwitchCase="'approved'" class="user-info">
                  <span class="pill approved">Locked</span>
                  <span class="name">{{getSquareName(row, col)}}</span>
                </span>
              </ng-container>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; background: #181a1b; color: #eee; font-family: system-ui, sans-serif; padding: 2rem; }
    .toolbar { display: flex; gap: 2rem; align-items: center; margin-bottom: 1.5rem; }
    .price-indicator {
      text-align: center;
      margin-bottom: 1.5rem;
      padding: 0.5rem;
      background: #2a2d30;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .price {
      color: #2ecc40;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .per-square {
      color: #aaa;
      font-size: 1rem;
    }
    .board-container {
      position: relative;
      padding: 3rem 0 0 3rem;
      margin: 0 2rem;
    }
    .axis-label {
      position: absolute;
      color: #f7c873;
      font-weight: bold;
      font-size: 1.4rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .x-axis {
      top: 0.5rem;
      width: 100%;
      text-align: center;
      left: 40px; /* Account for the left header column */
      right: 0;
    }
    .y-axis {
      left: 0;
      top: 50%;
      transform: rotate(-90deg) translateX(-50%);
      transform-origin: 0 0;
      text-align: center;
      width: max-content;
    }
    .board {
      display: grid;
      grid-template-columns: 40px repeat(var(--cols, 10), 1fr);
      grid-auto-rows: 56px;
      gap: 2px;
      background: #222;
      border-radius: 12px;
      overflow: auto;
      margin-bottom: 2rem;
    }
    .header {
      background: #222;
      color: #aaa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    .header.corner {
      background: #1a1a1a;
    }
    .cell {
      background: #23272a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: background 0.2s;
      outline: none;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
      cursor: default;
    }
    .cell.empty {
      background: #23272a;
      color: #666;
    }
    .cell.pending {
      background: #524726;
    }
    .cell.approved {
      background: #1e3a24;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      text-align: center;
    }
    .name {
      font-size: 0.8rem;
      color: #fff;
      word-break: break-word;
      max-width: 100%;
    }
    .pill {
      border-radius: 12px;
      padding: 0.2em 0.8em;
      font-size: 0.75rem;
      white-space: nowrap;
    }
    .pill.pending {
      background: #f7c873;
      color: #000;
    }
    .pill.approved {
      background: #2ecc40;
      color: #fff;
    }

    @media (max-width: 768px) {
      .board-container {
        padding: 2rem 0.5rem 0.5rem;
        margin: 0 0.5rem;
      }

      .axis-label {
        font-size: 1.2rem;
      }

      .cell {
        font-size: 1rem;
        grid-auto-rows: 48px;
      }

      .name {
        font-size: 0.7rem;
      }

      .pill {
        font-size: 0.6rem;
        padding: 0.1em 0.6em;
      }
    }
  `]
})
export class AdminBoardViewComponent implements OnInit, OnChanges {
  @Input() gameData: any = null;

  squares: any[] = [];
  gridSize = 10;
  rows: number[] = [];
  cols: number[] = [];

  async ngOnInit() {
    console.log('AdminBoardView ngOnInit - gameData:', this.gameData);
    if (this.gameData) {
      this.initializeBoard();
      await this.loadSquares();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('AdminBoardView ngOnChanges - gameData changed:', changes['gameData']);
    if (changes['gameData'] && this.gameData) {
      this.initializeBoard();
      await this.loadSquares();
    }
  }

  initializeBoard() {
    this.gridSize = this.gameData?.grid_size || 10;
    this.rows = Array.from({ length: this.gridSize }, (_, i) => i);
    this.cols = Array.from({ length: this.gridSize }, (_, i) => i);
    console.log('Board initialized with size:', this.gridSize);
  }

  async loadSquares() {
    if (!this.gameData?.id) {
      console.log('No gameData.id available for board view');
      return;
    }

    console.log('Loading squares for admin board view, game:', this.gameData.id);
    try {
      const { data, error } = await supabase
        .from('squares')
        .select('*')
        .eq('game_id', this.gameData.id);

      if (error) {
        console.error('Error loading squares for admin board view:', error);
        return;
      }

      this.squares = data || [];
      console.log('Admin board view loaded squares:', this.squares);

    } catch (err) {
      console.error('Error loading squares for admin board:', err);
    }
  }

  getCellStatus(row: number, col: number): string {
    const square = this.squares.find(s => s.row_idx === row && s.col_idx === col);
    return square?.status || 'empty';
  }

  getCellClass(row: number, col: number): any {
    const status = this.getCellStatus(row, col);
    return {
      cell: true,
      [status]: true,
      empty: status === 'empty'
    };
  }

  getSquareName(row: number, col: number): string {
    const square = this.squares.find(s => s.row_idx === row && s.col_idx === col);
    return square?.name || '';
  }
}
