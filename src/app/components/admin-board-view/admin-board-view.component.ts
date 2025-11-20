import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../data-sources/supabase.client';

@Component({
  selector: 'sq-admin-board-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="board-wrapper">
      <!-- Legend above the board -->
      <div class="legend">
        <span class="legend-item">
          <span class="legend-color" [style.background]="team1Color"></span>
          <span class="legend-name">{{ gameData?.team1_name || 'Home' }}</span>
        </span>
        <span class="legend-item">
          <span class="legend-color" [style.background]="team2Color"></span>
          <span class="legend-name">{{ gameData?.team2_name || 'Away' }}</span>
        </span>
      </div>
      <div class="table-container">
        <div class="corner-header"></div>
        <div class="scrollable-area">
          <div class="row-headers">
            <div class="row-header-spacer"></div>
            <div *ngFor="let row of rows" class="row-header" [style.color]="team2Color">{{ row }}</div>
          </div>
          <div class="content-area">
            <div class="column-headers">
              <div *ngFor="let col of cols" class="col-header" [style.color]="team1Color">{{ col }}</div>
            </div>
            <div class="grid-content" [style.--cols]="gridSize">
              <ng-container *ngFor="let row of rows">
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
                        <span class="pill" [ngClass]="isWinningSquare(row, col) ? 'winner' : 'approved'">
                          {{ isWinningSquare(row, col) ? 'Winner' : 'Locked' }}
                        </span>
                        <span class="name">{{getSquareName(row, col)}}</span>
                      </span>
                    </ng-container>
                  </div>
                </ng-container>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #181a1b;
      color: #eee;
      font-family: system-ui, sans-serif;
      padding: 1rem 0;
    }
    .legend {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-bottom: 1.5rem;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
      font-weight: bold;
    }
    .legend-color {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      min-width: 18px;
      min-height: 18px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      border: 2px solid #fff;
      margin-right: 0.3rem;
      vertical-align: middle;
      box-sizing: border-box;
    }
    .legend-name {
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .table-container {
      display: grid;
      grid-template-columns: 50px 1fr;
      grid-template-rows: 1fr;
      background: #222;
      border-radius: 12px;
      overflow: hidden;
      max-height: 80vh;
      border: 1px solid #333;
    }
    .corner-header {
      background: #1a1a1a;
      border-right: 2px solid #333;
      border-bottom: 2px solid #333;
      z-index: 30;
      grid-column: 1;
      grid-row: 1;
      height: 50px;
    }
    .scrollable-area {
      grid-column: 1 / -1;
      grid-row: 1;
      display: grid;
      grid-template-columns: 50px 1fr;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .row-headers {
      background: #2a2a2a;
      border-right: 2px solid #333;
      position: sticky;
      left: 0;
      z-index: 15;
      display: grid;
      grid-template-rows: 50px repeat(var(--cols, 10), 60px);
    }
    .row-header-spacer {
      background: #1a1a1a;
      border-bottom: 2px solid #333;
      height: 50px;
    }
    .row-header {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      height: 60px;
      border-bottom: 1px solid #333;
      font-size: 1.1rem;
      transition: color 0.2s;
    }
    .content-area {
      display: grid;
      grid-template-rows: 50px 1fr;
    }
    .column-headers {
      display: grid;
      grid-template-columns: repeat(var(--cols, 10), 60px);
      background: #2a2a2a;
      border-bottom: 2px solid #333;
      position: sticky;
      top: 0;
      z-index: 10;
      padding: 0;
    }
    .col-header {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      width: 60px;
      height: 50px;
      border-right: 1px solid #333;
      box-sizing: border-box;
      font-size: 1.1rem;
      transition: color 0.2s;
    }
    .grid-content {
      display: grid;
      grid-template-columns: repeat(var(--cols, 10), 60px);
      grid-template-rows: repeat(var(--cols, 10), 60px);
      background: #222;
      padding: 0;
    }
    .cell {
      background: #23272a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: background 0.2s;
      outline: none;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
      cursor: default;
      position: relative;
      border-radius: 0;
      box-sizing: border-box;
      width: 60px;
      height: 60px;
      border: 1px solid #333;
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
    .cell.winner {
      background: #2ecc40 !important;
      color: #fff;
      font-weight: bold;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      text-align: center;
    }
    .name {
      font-size: 0.7rem;
      color: #fff;
      word-break: break-word;
      max-width: 100%;
      line-height: 1.1;
    }
    .pill {
      border-radius: 8px;
      padding: 0.1em 0.5em;
      font-size: 0.6rem;
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
    .pill.winner {
      background: #ffcc00;
      color: #000;
      font-weight: bold;
    }
    @media (max-width: 768px) {
      .board-wrapper {
        padding: 2rem 0.5rem 0.5rem;
        margin: 0 0.5rem;
      }
      .legend {
        gap: 1rem;
        font-size: 0.95rem;
      }
      .axis-label {
        font-size: 1.2rem;
      }
      .table-container {
        max-height: 70vh;
      }
      .column-headers {
        grid-template-columns: repeat(var(--cols, 10), 50px);
      }
      .grid-content {
        grid-template-columns: repeat(var(--cols, 10), 50px);
        grid-template-rows: repeat(var(--cols, 10), 48px);
      }
      .col-header {
        width: 50px;
        font-size: 0.9rem;
      }
      .row-headers {
        grid-template-rows: 50px repeat(var(--cols, 10), 50px);
      }
      .row-header {
        height: 50px;
        font-size: 0.9rem;
      }
      .cell {
        font-size: 0.8rem;
        width: 50px;
        height: 48px;
        padding: 0.25rem;
      }
      .name {
        font-size: 0.6rem;
      }
      .pill {
        font-size: 0.5rem;
        padding: 0.1em 0.4em;
      }
      .legend-color {
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        aspect-ratio: 1/1;
        margin-right: 0.2rem;
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

  // Team colors for legend and headers
  team1Color = '#3498db'; // Default blue
  team2Color = '#e74c3c'; // Default red

  // Store winning squares data
  winningSquares: Array<{
    row_idx: number;
    col_idx: number;
    period_no: number;
    winner_name: string;
  }> = [];

  async ngOnInit() {
    this.setTeamColors();
    if (this.gameData) {
      this.initializeBoard();
      await this.loadSquares();
      await this.loadWinningSquares();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['gameData'] && this.gameData) {
      this.setTeamColors();
      this.initializeBoard();
      await this.loadSquares();
      await this.loadWinningSquares();
    }
  }

  setTeamColors() {
    // Use colors from gameData if available, otherwise fallback
    this.team1Color = this.gameData?.team1_color || '#3498db';
    this.team2Color = this.gameData?.team2_color || '#e74c3c';
  }

  initializeBoard() {
    this.gridSize = this.gameData?.grid_size || 10;

    // Use randomized axis numbers from database if available, otherwise fall back to sequential
    if (this.gameData?.x_axis_numbers && this.gameData?.y_axis_numbers) {
      // Use the randomized numbers from the database
      this.cols = this.gameData.x_axis_numbers.slice(0, this.gridSize);
      this.rows = this.gameData.y_axis_numbers.slice(0, this.gridSize);
      console.log('Using randomized axis numbers from database');
      console.log('X-axis (cols):', this.cols);
      console.log('Y-axis (rows):', this.rows);
    } else {
      // Fallback to sequential numbers if randomized numbers aren't available
      this.rows = Array.from({ length: this.gridSize }, (_, i) => i);
      this.cols = Array.from({ length: this.gridSize }, (_, i) => i);
      console.log('Using sequential fallback numbers');
    }

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

  async loadWinningSquares() {
    if (!this.gameData?.id) return;

    try {
      // Query game_winners table to get winning square positions from home_digit and away_digit
      const { data, error } = await supabase
        .from('game_winners')
        .select(`
          period_no,
          winner_name,
          home_digit,
          away_digit
        `)
        .eq('game_id', this.gameData.id);

      if (error) {
        console.error('Error loading winning squares for admin board:', error);
        return;
      }

      // Map the winning squares data using home_digit and away_digit as coordinates
      this.winningSquares = (data || []).map(winner => ({
        row_idx: winner.away_digit, // Invert: away_digit is now row (Y-axis)
        col_idx: winner.home_digit, // Invert: home_digit is now col (X-axis)
        period_no: winner.period_no,
        winner_name: winner.winner_name || ''
      }));

      console.log('Admin board loaded winning squares:', this.winningSquares);
    } catch (err) {
      console.error('Unexpected error loading winning squares for admin board:', err);
    }
  }

  getCellStatus(row: number, col: number): string {
    const square = this.squares.find(s => s.row_idx === row && s.col_idx === col);
    return square?.status || 'empty';
  }

  getCellClass(row: number, col: number): any {
    const status = this.getCellStatus(row, col);
    const isWinner = this.isWinningSquare(row, col);

    return {
      cell: true,
      [status]: true,
      empty: status === 'empty',
      winner: isWinner
    };
  }

  getSquareName(row: number, col: number): string {
    const square = this.squares.find(s => s.row_idx === row && s.col_idx === col);
    return square?.name || '';
  }

  shouldShowAxisNumbers(): boolean {
    // Admin view should always show axis numbers for coordinate reference
    return true;
  }

  isWinningSquare(row: number, col: number): boolean {
    const isInWinnersTable = this.winningSquares.some(winner => {
      const matches = row === winner.row_idx && col === winner.col_idx;
      return matches;
    });

    return isInWinnersTable;
  }
}

