import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../data-sources/supabase.client';

@Component({
  selector: 'sq-admin-board-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="board-wrapper">
      <div class="axis-label x-axis">{{ gameData?.team1_name || 'Home' }}</div>
      <div class="axis-label y-axis">{{ gameData?.team2_name || 'Away' }}</div>

      <div class="table-container">
        <!-- Fixed corner -->
        <div class="corner-header"></div>

        <!-- Scrollable content area that includes both headers and grid -->
        <div class="scrollable-area">
          <!-- Row headers (sticky) -->
          <div class="row-headers">
            <div class="row-header-spacer"></div> <!-- Spacer for column headers -->
            <div *ngFor="let row of rows" class="row-header">{{ shouldShowAxisNumbers() ? row : '?' }}</div>
          </div>

          <!-- Content area with column headers and grid -->
          <div class="content-area">
            <!-- Column headers -->
            <div class="column-headers">
              <div *ngFor="let col of cols" class="col-header">{{ shouldShowAxisNumbers() ? col : '?' }}</div>
            </div>

            <!-- Grid content -->
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
      padding: 1rem 0; /* Reduced padding and removed left padding */
    }

    .board-wrapper {
      position: relative;
      padding: 3rem 1rem 1rem 0; /* Added padding top/bottom/left, removed left padding */
      margin: 0; /* Removed margins */
    }

    .axis-label {
      position: absolute;
      color: #f7c873;
      font-weight: bold;
      font-size: 1.4rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 25;
    }

    .x-axis {
      top: -2.5rem;
      left: 58%;
      transform: translateX(-50%);
      text-align: center;
    }

    .y-axis {
      left: -1rem; /* Adjusted to account for removed padding */
      top: 75%;
      transform: rotate(-90deg) translateY(-50%);
      transform-origin: left center;
      text-align: center;
      width: max-content;
    }

    .table-container {
      display: grid;
      grid-template-columns: 50px 1fr;
      grid-template-rows: 1fr;
      background: #222;
      border-radius: 12px;
      overflow: hidden;
      max-height: 80vh;
      border: 1px solid #333; /* Added border for better definition */
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
      grid-template-rows: 50px repeat(var(--cols, 10), 60px); /* Increased to match cell height exactly */
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
      color: #aaa;
      height: 60px; /* Match exact cell height */
      border-bottom: 1px solid #333;
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
      padding: 0; /* Removed padding */
    }

    .col-header {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #aaa;
      width: 60px;
      height: 50px;
      border-right: 1px solid #333;
      box-sizing: border-box;
    }

    .grid-content {
      display: grid;
      grid-template-columns: repeat(var(--cols, 10), 60px);
      grid-template-rows: repeat(var(--cols, 10), 60px); /* Match row header height exactly */
      background: #222;
      padding: 0; /* Removed padding */
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
      border-radius: 0; /* Removed border radius for perfect alignment */
      box-sizing: border-box;
      width: 60px;
      height: 60px; /* Match row header height exactly */
      border: 1px solid #333; /* Added consistent border */
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

      .axis-label {
        font-size: 1.2rem;
      }

      .table-container {
        max-height: 70vh;
      }

      .column-headers {
        grid-template-columns: repeat(var(--cols, 10), 50px); /* Match mobile cell width */
      }

      .grid-content {
        grid-template-columns: repeat(var(--cols, 10), 50px);
        grid-template-rows: repeat(var(--cols, 10), 48px); /* Adjust row height for mobile */
      }

      .col-header {
        width: 50px; /* Match mobile cell width */
        font-size: 0.9rem;
      }

      .row-headers {
        grid-template-rows: 50px repeat(var(--cols, 10), 50px); /* Match mobile cell height + gap */
      }

      .row-header {
        height: 50px; /* Match mobile cell height + gap */
        font-size: 0.9rem;
      }

      .cell {
        font-size: 0.8rem;
        width: 50px; /* Mobile cell width */
        height: 48px; /* Mobile cell height */
        padding: 0.25rem; /* Smaller padding for mobile */
      }

      .name {
        font-size: 0.6rem;
      }

      .pill {
        font-size: 0.5rem;
        padding: 0.1em 0.4em;
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

  // Store winning squares data
  winningSquares: Array<{
    row_idx: number;
    col_idx: number;
    period_no: number;
    winner_name: string;
  }> = [];

  async ngOnInit() {
    console.log('AdminBoardView ngOnInit - gameData:', this.gameData);
    if (this.gameData) {
      this.initializeBoard();
      await this.loadSquares();
      await this.loadWinningSquares();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('AdminBoardView ngOnChanges - gameData changed:', changes['gameData']);
    if (changes['gameData'] && this.gameData) {
      this.initializeBoard();
      await this.loadSquares();
      await this.loadWinningSquares();
    }
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
        row_idx: winner.home_digit, // home_digit is the row (Y-axis)
        col_idx: winner.away_digit, // away_digit is the column (X-axis)
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
    // Always show axis numbers if the game is closed (final reveal)
    if (this.gameData?.status === 'closed') {
      return true;
    }

    // Otherwise, check the hide_axes flag from game data
    return !this.gameData?.hide_axes;
  }

  isWinningSquare(row: number, col: number): boolean {
    const isInWinnersTable = this.winningSquares.some(winner => {
      const matches = row === winner.row_idx && col === winner.col_idx;
      return matches;
    });

    return isInWinnersTable;
  }
}
