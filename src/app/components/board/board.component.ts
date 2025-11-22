import { Component, signal, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../services/board.service';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { Square, SquareStatus } from '../../models/square.model';
import { supabase } from '../../data-sources/supabase.client';

export enum GameStatus {
  Open = 'open',
  Cancel = 'cancel',
  Locked = 'locked',
  Started = 'started',
  Complete = 'complete',
}

@Component({
  selector: 'sq-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RequestModalComponent],
  template: `
    <!-- Winner Banner - Shows when game is closed and winners exist -->
    <!--    <div *ngIf="shouldShowWinnerBanner()" class="winner-banner">-->
    <!--      <div class="banner-content">-->
    <!--        <h2>🎉 Congratulations to the winner! This game is now complete. 🎉</h2>-->
    <!--        <div *ngIf="getWinnerNames().length > 0" class="winner-names">-->
    <!--          <strong>Winners:</strong> {{ getWinnerNames().join(', ') }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="board-wrapper" [style]="getDynamicStyles()">
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
        <!-- Fixed corner -->
        <div class="corner-header"></div>

        <!-- Scrollable content area that includes both headers and grid -->
        <div class="scrollable-area">
          <!-- Row headers (sticky) -->
          <div class="row-headers">
            <div class="row-header-spacer"></div> <!-- Spacer for column headers -->
            <ng-container *ngFor="let row of getLogicalRows(); let rowIndex = index">
              <div
                class="row-header"
                [style.color]="team2Color">
                {{ shouldShowAxisNumbers() ? row : '?' }}
              </div>
            </ng-container>
          </div>

          <!-- Content area with column headers and grid -->
          <div class="content-area">
            <!-- Column headers -->
            <div class="column-headers">
              <ng-container *ngFor="let col of getLogicalCols(); let colIndex = index">
                <div
                  class="col-header"
                  [style.color]="team1Color">
                  {{ shouldShowAxisNumbers() ? col : '?' }}
                </div>
              </ng-container>
            </div>

            <!-- Grid content -->
            <div class="grid-content">
              <ng-container *ngFor="let row of getLogicalRows(); let rowIndex = index">
                <ng-container *ngFor="let col of getLogicalCols(); let colIndex = index">
                  <div
                    class="cell"
                    [ngClass]="cellClassLogical(rowIndex, colIndex)"
                    (click)="cellClickLogical(rowIndex, colIndex)"
                    tabindex="0"
                    [attr.aria-label]="ariaLabelLogical(rowIndex, colIndex)"
                  >
                    <ng-container [ngSwitch]="cellStatusLogical(rowIndex, colIndex)">
                      <span *ngSwitchCase="'empty'">+</span>
                      <span *ngSwitchCase="'pending'" class="user-info">
                        <span class="pill pending">Pending</span>
                        <span class="name">{{getSquareNameLogical(rowIndex, colIndex)}}</span>
                      </span>
                      <span *ngSwitchCase="'approved'" class="user-info">
                        <span class="pill" [ngClass]="isWinningSquareLogical(rowIndex, colIndex) ? 'winner' : 'approved'">
                          {{ isWinningSquareLogical(rowIndex, colIndex) ? 'Winner' : 'Locked' }}
                        </span>
                        <span class="name">{{getSquareNameLogical(rowIndex, colIndex)}}</span>
                      </span>
                    </ng-container>
                  </div>
                </ng-container>
              </ng-container>
            </div>
          </div>
        </div>
      </div> <!-- end .table-container -->

    <!-- Modal should always be rendered at the top level for visibility -->
    <sq-request-modal
      [open]="modalOpen()"
      [row]="modalRow()"
      [col]="modalCol()"
      [coordinates]="modalCoordinates()"
      [gameData]="gameData"
      (closed)="closeModal()"
      (requested)="request($event)"
    />

    <!-- If you do not see the modal, check z-index, parent overflow, and modalOpen signal value -->

    <div *ngIf="admin()" class="admin-panel">
      <h3>Pending Requests</h3>
      <div *ngFor="let sq of pending()">
        <span>{{sq.name}}</span>
        <span>{{obfuscateEmail(sq.email!)}}</span>
        <span>[{{sq.row}},{{sq.col}}]</span>
        <button (click)="approve(sq.id)">Approve</button>
        <button (click)="decline(sq.id)">Decline</button>
      </div>
      <h3>Approved Squares</h3>
      <div *ngFor="let sq of approved()">
        <span>{{sq.name}}</span>
        <span>[{{sq.row}},{{sq.col}}]</span>
      </div>
    </div>
  </div> <!-- Close the board-wrapper div -->
  `,
  styles: [
    `
    :host { display: block; background: #181a1b; color: #eee; font-family: system-ui, sans-serif; padding: 2rem 0 2rem 2rem; }

    .board-wrapper {
      position: relative;
      padding: 3rem 0 0 0;
      margin: 0 0 0 2rem;
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

    .board-wrapper {
      padding-top: 2rem;
    }

    .table-container {
      display: grid;
      grid-template-columns: 50px 1fr;
      grid-template-rows: 1fr;
      background: #222;
      border-radius: 12px;
      overflow: hidden;
      max-height: 80vh;
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
      grid-template-rows: 50px repeat(var(--logical-rows, 10), var(--cell-height, 58px));
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
      border-bottom: 1px solid #333;
      padding: 0.25rem;
      line-height: 1.2;
      word-break: break-word;
      text-align: center;
      white-space: pre-line;
    }

    .content-area {
      display: grid;
      grid-template-rows: 50px 1fr;
    }

    .column-headers {
      display: grid;
      grid-template-columns: repeat(var(--logical-cols, 10), var(--cell-size, 60px));
      background: #2a2a2a;
      border-bottom: 2px solid #333;
      position: sticky;
      top: 0;
      z-index: 10;
      gap: 2px;
      padding: 2px;
    }

    .col-header {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #aaa;
      height: 50px;
      border-right: 1px solid #333;
      box-sizing: border-box;
      padding: 0.25rem;
      line-height: 1.2;
      word-break: break-word;
      text-align: center;
      white-space: pre-line;
    }

    .grid-content {
      display: grid;
      grid-template-columns: repeat(var(--logical-cols, 10), var(--cell-size, 60px));
      grid-template-rows: repeat(var(--logical-rows, 10), var(--cell-height, 56px));
      gap: 2px;
      padding: 2px;
      background: #222;
    }

    .cell {
      background: #23272a;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: var(--cell-font-size, 1.2rem);
      transition: background 0.2s;
      outline: none;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
      border-radius: 4px;
      box-sizing: border-box;
      /* Remove fixed width/height to let grid span control the size */
      min-width: 0;
      min-height: 0;
    }

    .cell.empty:hover, .cell.empty:focus { background: #2c3136; }
    .cell.pending { background: #524726; }
    .cell.approved { background: #1e3a24; }
    .cell.winner { background: #2ecc40 !important; color: #fff; font-weight: bold; }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      text-align: center;
    }
    .name {
      font-size: var(--name-font-size, 0.7rem);
      color: #fff;
      word-break: break-word;
      max-width: 100%;
      line-height: 1.1;
    }
    .pill {
      border-radius: 8px;
      padding: 0.1em 0.5em;
      font-size: var(--pill-font-size, 0.6rem);
      white-space: nowrap;
    }
    .pill.pending { background: #f7c873; color: #000; }
    .pill.approved { background: #2ecc40; color: #fff; }
    .pill.winner { background: #ffcc00; color: #000; font-weight: bold; }

    .admin-panel { background: #222; border-radius: 12px; padding: 1rem; margin-top: 2rem; }
    .admin-panel h3 { margin-top: 0; }
    .admin-panel div { display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem; }
    button { background: #444; color: #fff; border: none; border-radius: 6px; padding: 0.3rem 0.8rem; cursor: pointer; }
    button:hover { background: #666; }
    select, input[type="checkbox"] { margin-left: 0.5rem; }
    .winner-banner {
      background: linear-gradient(135deg, #2ecc40, #27ae60);
      color: #fff;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      text-align: center;
      box-shadow: 0 4px 20px rgba(46, 204, 64, 0.3);
      border: 2px solid #27ae60;
      animation: fadeInScale 0.5s ease-out;
    }
    .banner-content h2 {
      margin: 0 0 1rem 0;
      font-size: 1.8rem;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
    .winner-names {
      font-size: 1.2rem;
      margin-top: 1rem;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      display: inline-block;
    }
    .game-info-panel {
      background: #222;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      animation: fadeIn 0.5s ease-out;
    }
    .game-info-content h3 {
      margin: 0 0 1rem 0;
      font-size: 1.6rem;
      font-weight: bold;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem;
      background: #2a2d30;
      border-radius: 8px;
    }
    .info-label {
      font-weight: bold;
      color: #f7c873;
    }
    .info-value {
      color: #fff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .status-badge {
      padding: 0.4rem 0.8rem;
      border-radius: 12px;
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: bold;
    }
    .status-badge.open { background: #3498db; color: #fff; }
    .status-badge.active { background: #2ecc40; color: #fff; }
    .status-badge.closed { background: #e74c3c; color: #fff; }
    .info-badge {
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    .info-badge.reverse { background: #f39c12; color: #000; }
    .status-visible {
      color: #2ecc40;
      font-weight: bold;
    }
    .status-hidden {
      color: #e74c3c;
      font-weight: bold;
    }
    .reverse-info {
      background: #2c3136;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-size: 0.9rem;
      border-left: 4px solid #f39c12;
    }
    .reverse-info p {
      margin: 0;
      color: #ddd;
    }
    @media (max-width: 768px) {
      .board-wrapper {
        padding: 2rem 0.5rem 0.5rem;
        margin: 0 0.5rem;
      }

      .axis-label {
        font-size: 1.2rem;
      }

      .legend {
        gap: 1rem;
        font-size: 0.95rem;
      }
      .legend-color {
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        aspect-ratio: 1/1;
        margin-right: 0.2rem;
      }

      .table-container {
        max-height: 70vh;
      }

      .column-headers {
        grid-template-columns: repeat(var(--logical-cols, 10), var(--mobile-cell-size, 50px));
      }

      .grid-content {
        grid-template-columns: repeat(var(--logical-cols, 10), var(--mobile-cell-size, 50px));
        grid-template-rows: repeat(var(--logical-rows, 10), var(--mobile-cell-size, 50px));
      }

      .col-header {
        width: var(--mobile-cell-size, 50px);
        font-size: 0.9rem;
      }

      .row-headers {
        grid-template-rows: 50px repeat(var(--logical-rows, 10), var(--mobile-cell-size, 50px));
      }

      .row-header {
        height: var(--mobile-cell-size, 50px);
        font-size: 0.9rem;
      }

      .cell {
        font-size: var(--mobile-font-size, 0.8rem);
        width: var(--mobile-cell-size, 50px);
        height: var(--mobile-cell-size, 50px);
        padding: 0.25rem;
      }

      .name {
        font-size: var(--mobile-name-size, 0.6rem);
      }

      .pill {
        font-size: var(--mobile-pill-size, 0.5rem);
        padding: 0.1em 0.4em;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
      .info-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `]
})
export class BoardComponent implements OnInit {
  @Input() gameData: any = null;

  sizes = [5, 6, 8, 10, 12, 20];
  size = this.board.gridSize;
  rows = this.board.rows;
  cols = this.board.cols;
  admin = this.board.adminMode;
  pending = this.board.pendingRequests;
  approved = this.board.approvedSquares;

  // Override rows and cols with game data
  displayRows: number[] = [];
  displayCols: number[] = [];

  // Add logical grid arrays for headers
  logicalRows: (number | string)[] = [];
  logicalCols: (number | string)[] = [];

  // Add properties for logical square mapping
  logicalGridSize: number = 10;
  logicalGridRows: number = 10;  // Separate row dimension
  logicalGridCols: number = 10;  // Separate column dimension
  displayGridSize: number = 10;
  cellsPerLogicalSquare: number = 1;
  cellsPerLogicalSquareRow: number = 1;  // Cells per logical square in row dimension
  cellsPerLogicalSquareCol: number = 1;  // Cells per logical square in col dimension

  // Store winning squares data
  winningSquares: Array<{
    row_idx: number;
    col_idx: number;
    period_no: number;
    winner_name: string;
  }> = [];

  modalOpen = signal(false);
  modalRow = signal<number>(0);
  modalCol = signal<number>(0);
  modalCoordinates = signal<{ row: number; col: number }[]>([]);

  team1Color = '#3498db'; // Default blue
  team2Color = '#e74c3c'; // Default red

  constructor(public board: BoardService) {}

  async ngOnInit() {
    // Always initialize board with 100 backend squares (10x10 grid)
    // Visual grouping is determined by total_squares (e.g., 25, 50, etc.)
    const backendBoardSize = 10; // 10x10 = 100 squares
    const gameId = this.gameData?.id;

    if (gameId) {
      await this.board.initBoard(backendBoardSize, gameId);
      // Load winning squares data
      await this.loadWinningSquares();
    } else {
      await this.board.initBoard(backendBoardSize);
    }

    // Set up display rows and cols from game data
    this.initializeAxisNumbers();

    // Calculate logical square mapping based on total_squares
    this.calculateLogicalSquareMapping();

    // Populate logical axis numbers (paired numbers for 25 squares, single for 100 squares)
    this.populateLogicalAxisNumbers();

    this.setTeamColors();
  }

  setTeamColors() {
    this.team1Color = this.gameData?.team1_color || '#3498db';
    this.team2Color = this.gameData?.team2_color || '#e74c3c';
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
        console.error('Error loading winning squares:', error);
        return;
      }

      // Map the winning squares data using home_digit and away_digit as coordinates
      this.winningSquares = (data || []).map(winner => ({
        row_idx: winner.home_digit, // home_digit is the row (Y-axis winning number)
        col_idx: winner.away_digit, // away_digit is the column (X-axis winning number)
        period_no: winner.period_no,
        winner_name: winner.winner_name || ''
      }));

      console.log('Loaded winning squares for board highlighting:', this.winningSquares);
      console.log('Number of winning squares found:', this.winningSquares.length);
      console.log('Winning coordinates:', this.winningSquares.map(w => `[${w.row_idx}, ${w.col_idx}] - ${w.winner_name}`));
    } catch (err) {
      console.error('Unexpected error loading winning squares:', err);
    }
  }

  isWinningSquare(row: number, col: number): boolean {
    // Find the winning square by matching the display values (what shows on the board headers)
    // with the winning digits from the game_winners table

    const isInWinnersTable = this.winningSquares.some(winner => {
      // winner.row_idx is home_digit (Y-axis winning number)
      // winner.col_idx is away_digit (X-axis winning number)
      // We need to find the square where the display shows these numbers

      const matches = row === winner.row_idx && col === winner.col_idx;
      console.log(`Comparing winner digits [${winner.row_idx}, ${winner.col_idx}] with square [${row}, ${col}]: ${matches}`);
      return matches;
    });

    if (isInWinnersTable) {
      console.log(`✓ Square [${row}, ${col}] is a winner!`);
      return true;
    }

    return false;
  }

  initializeAxisNumbers() {
    // Always use 10 numbers for display (0-9) regardless of total squares
    const displayGridSize = 10;

    // Use randomized axis numbers from database if available, otherwise fall back to sequential
    if (this.gameData?.x_axis_numbers && this.gameData?.y_axis_numbers) {
      // Use the randomized numbers from the database
      this.displayCols = this.gameData.x_axis_numbers.slice(0, 10);
      this.displayRows = this.gameData.y_axis_numbers.slice(0, 10);
      console.log('Player board using randomized axis numbers from database');
      console.log('X-axis (cols):', this.displayCols);
      console.log('Y-axis (rows):', this.displayRows);
    } else {
      // Fallback to sequential numbers if randomized numbers aren't available
      this.displayRows = Array.from({ length: displayGridSize }, (_, i) => i);
      this.displayCols = Array.from({ length: displayGridSize }, (_, i) => i);
      console.log('Player board using sequential fallback numbers');
      console.log('X-axis (cols):', this.displayCols);
      console.log('Y-axis (rows):', this.displayRows);
    }

    // Initialize logical arrays (currently not used for 100-square board)
    this.logicalRows = [];
    this.logicalCols = [];
  }

  // Add method to populate logical axis numbers based on grouping
  private populateLogicalAxisNumbers() {
    // For headers, we combine numbers based on the grouping
    // For 25 squares (5x5), we combine every 2 numbers: "3/7", "1/9", etc.
    // For 10 squares (2x5), rows combine every 5 numbers, cols combine every 2 numbers
    this.logicalRows = [];
    this.logicalCols = [];

    // Populate logical rows
    for (let i = 0; i < this.logicalGridRows; i++) {
      const startIndex = i * this.cellsPerLogicalSquareRow;
      const rowNumbers: number[] = [];

      for (let j = 0; j < this.cellsPerLogicalSquareRow; j++) {
        const index = startIndex + j;
        if (index < this.displayRows.length) {
          rowNumbers.push(this.displayRows[index]);
        }
      }

      // For rows with more than 2 numbers, use newlines for vertical stacking
      // Otherwise use forward slash for horizontal display
      if (rowNumbers.length > 2) {
        this.logicalRows.push(rowNumbers.join('\n') as any);
      } else {
        this.logicalRows.push(rowNumbers.join('/') as any);
      }
    }

    // Populate logical columns
    for (let i = 0; i < this.logicalGridCols; i++) {
      const startIndex = i * this.cellsPerLogicalSquareCol;
      const colNumbers: number[] = [];

      for (let j = 0; j < this.cellsPerLogicalSquareCol; j++) {
        const index = startIndex + j;
        if (index < this.displayCols.length) {
          colNumbers.push(this.displayCols[index]);
        }
      }

      // For columns with more than 2 numbers, use newlines for vertical stacking
      // Otherwise use forward slash for horizontal display
      if (colNumbers.length > 2) {
        this.logicalCols.push(colNumbers.join('\n') as any);
      } else {
        this.logicalCols.push(colNumbers.join('/') as any);
      }
    }

    console.log('Logical axis numbers for headers (combined):');
    console.log('Logical rows:', this.logicalRows);
    console.log('Logical cols:', this.logicalCols);
  }

  // Add getter methods for logical arrays
  getLogicalRows(): (number | string)[] {
    return this.logicalRows;
  }

  getLogicalCols(): (number | string)[] {
    return this.logicalCols;
  }

  // Update template methods to use display arrays
  getDisplayRows(): number[] {
    return this.displayRows;
  }

  getDisplayCols(): number[] {
    return this.displayCols;
  }

  cellStatus(row: number, col: number): SquareStatus {
    const squares = this.board.squares() || [];
    const sq = squares.find(s => Number(s.row_idx) === row && Number(s.col_idx) === col);
    return sq?.status || 'empty';
  }

  cellClass(row: number, col: number) {
    const status = this.cellStatus(row, col);
    const isWinner = this.isWinningSquare(row, col);

    return {
      cell: true,
      [status]: true,
      empty: status === 'empty',
      winner: isWinner
    };
  }

  ariaLabel(row: number, col: number) {
    const status = this.cellStatus(row, col);
    if (status === 'empty') return `Empty square at row ${row}, column ${col}`;
    if (status === 'pending') return `Pending request at row ${row}, column ${col}`;
    if (status === 'approved') return `Locked square at row ${row}, column ${col}`;
    return '';
  }

  cellClick(row: number, col: number) {
    const status = this.cellStatus(row, col);

    // Check if game is in open status before allowing square assignment
    if (status === 'empty' && !this.admin()) {
      // Only allow square assignment if game is in open status
      if (!this.isGameOpen()) {
        alert('This game is no longer accepting new square assignments. The game status is: ' + this.getGameStatus());
        return;
      }

      this.modalRow.set(row);
      this.modalCol.set(col);

      // Calculate all coordinates for this logical square (for 25-square games, this will be 4 coordinates)
      if (this.cellsPerLogicalSquare > 1) {
        const coordinates = this.getAllSquareCoordinatesForLogicalSquare(row, col);
        this.modalCoordinates.set(coordinates);
      } else {
        // Single square - just set the one coordinate
        this.modalCoordinates.set([{ row, col }]);
      }

      this.modalOpen.set(true);
    } else if (this.admin() && (status === 'pending' || status === 'approved')) {
      const squares = this.board.squares() || [];
      const sq = squares.find((s: Square) => Number(s.row_idx) === row && Number(s.col_idx) === col);
      if (sq) {
        this.decline(sq.id);
      }
    }
  }

  // Helper method to check if game is in open status
  private isGameOpen(): boolean {
    if (!this.gameData) return false;
    const gameStatus = this.gameData.status?.toLowerCase();
    return gameStatus === GameStatus.Open || gameStatus === 'open';
  }

  // Helper method to get the current game status for display
  private getGameStatus(): string {
    if (!this.gameData || !this.gameData.status) return 'unknown';
    return this.gameData.status;
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  async request({ name, email, userId, friendEmail }: { name: string; email: string; userId?: string; friendEmail?: string }) {
    const isGrowth = (this.gameData?.game_mode === 'growth');

    // Check if we need to request multiple squares (for 25-square games)
    if (this.cellsPerLogicalSquare > 1) {
      // Use the coordinates we already generated when the square was clicked
      const coordinates = this.modalCoordinates();

      console.log('[BoardComponent] Requesting multiple squares:', coordinates);

      try {
        await this.board.requestMultipleSquares(coordinates, name, email, userId);
        this.closeModal();
      } catch (error: any) {
        alert(error.message || 'Failed to request squares. Please try again.');
      }
    } else {
      // Single square request (for 100-square games)
      if (isGrowth) {
        await this.requestGrowthSquare({ name, email, userId, friendEmail });
      } else {
        await this.requestRegularSquare({ name, email, userId });
      }
      this.closeModal();
    }
  }

  async requestRegularSquare({ name, email, userId }: { name: string; email: string; userId?: string }) {
    console.log('[BoardComponent] Requesting regular square with:', {
      row: this.modalRow(),
      col: this.modalCol(),
      name,
      email,
      userId,
      gameMode: this.gameData?.game_mode
    });
    await this.board.requestSquare(this.modalRow(), this.modalCol(), name, email, userId);
  }

  async requestGrowthSquare({ name, email, userId, friendEmail }: { name: string; email: string; userId?: string; friendEmail?: string }) {
    console.log('[BoardComponent] Requesting growth square with:', {
      row: this.modalRow(),
      col: this.modalCol(),
      name,
      email,
      userId,
      friendEmail,
      gameMode: this.gameData?.game_mode
    });
    await this.board.requestGrowthSquare(this.modalRow(), this.modalCol(), name, email, userId, friendEmail);
  }

  async approve(id: string) {
    await this.board.approve(id);
  }

  async decline(id: string) {
    await this.board.decline(id);
  }

  changeSize(event: Event) {
    const size = +(event.target as HTMLSelectElement).value;
    this.board.initBoard(size);
  }

  reset() {
    this.board.resetBoard();
  }

  toggleAdmin() {
    this.board.toggleAdmin();
  }

  obfuscateEmail(email: string): string {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    const visible = user.slice(0, 3);
    return `${visible}${'*'.repeat(Math.max(0, user.length - 3))}@${domain}`;
  }

  getSquareName(row: number, col: number): string {
    const squares = this.board.squares() || [];
    const sq = squares.find(s => Number(s.row_idx) === row && Number(s.col_idx) === col);
    return sq?.name || '';
  }

  // Helper method to determine if a grouped header should be shown
  // Only show header for the first cell in each group
  shouldShowGroupedHeader(index: number): boolean {
    return index % this.cellsPerLogicalSquare === 0;
  }

  shouldShowAxisNumbers(): boolean {
    // Always show axis numbers if the game is closed, complete, or started (final reveal or game in progress)
    if (this.gameData?.status === 'closed' ||
        this.gameData?.status === 'complete' ||
        this.gameData?.status === 'started') {
      return true;
    }

    // Otherwise, check the hide_axes flag from game data
    return !this.gameData?.hide_axes;
  }

  shouldShowWinnerBanner(): boolean {
    // Show the winner banner if the game is closed and there are winning squares
    return this.gameData?.status === GameStatus.Complete && this.getWinnerNames().length > 0;
  }

  getWinnerNames(): string[] {
    // Extract unique winner names from the winning squares data
    const names = new Set(this.winningSquares.map(w => w.winner_name));
    return Array.from(names);
  }

  isBoardAvailable(): boolean {
    return this.gameData?.status === GameStatus.Open || this.gameData?.status === GameStatus.Started;
  }

  getDynamicStyles() {
    // Always use 10x10 display grid
    const displayGridSize = 10;

    // For visual squares, use the total_squares from gameData
    const visualSquares = this.gameData?.total_squares || 25;

    // Define grid configurations for different square counts
    const gridConfigs: Record<number, { rows: number; cols: number }> = {
      100: { rows: 10, cols: 10 },  // 10x10
      50: { rows: 5, cols: 10 },    // 5x10 (1x2 squares)
      25: { rows: 5, cols: 5 },     // 5x5
      10: { rows: 2, cols: 5 },     // 2x5
      4: { rows: 2, cols: 2 },      // 2x2
    };

    // Get the logical grid dimensions
    const gridConfig = gridConfigs[visualSquares] || { rows: Math.sqrt(visualSquares), cols: Math.sqrt(visualSquares) };
    const logicalGridRows = gridConfig.rows;
    const logicalGridCols = gridConfig.cols;

    // Define size mappings based on total_squares directly
    const sizeConfigBySquares: Record<number, { cellSize: number; fontSize: number; pillSize: number; nameSize: number }> = {
      100: { cellSize: 60, fontSize: 1.2, pillSize: 0.6, nameSize: 0.7 },    // 10x10 = 100 squares
      50: { cellSize: 80, fontSize: 1.25, pillSize: 0.7, nameSize: 0.8 },   // 5x10 = 50 squares
      25: { cellSize: 150, fontSize: 1.4, pillSize: 0.9, nameSize: 1.0 },   // 5x5 = 25 squares
      10: { cellSize: 120, fontSize: 1.3, pillSize: 0.8, nameSize: 0.9 },   // 2x5 = 10 squares
      4: { cellSize: 300, fontSize: 2.5, pillSize: 1.2, nameSize: 1.3 },    // 2x2 = 4 squares
    };

    // Mobile size configuration
    const mobileSizeConfigBySquares: Record<number, { cellSize: number; fontSize: number; pillSize: number; nameSize: number }> = {
      100: { cellSize: 50, fontSize: 0.8, pillSize: 0.5, nameSize: 0.6 },   // 10x10 = 100 squares
      50: { cellSize: 65, fontSize: 0.85, pillSize: 0.55, nameSize: 0.65 }, // 5x10 = 50 squares
      25: { cellSize: 100, fontSize: 1.0, pillSize: 0.7, nameSize: 0.8 },   // 5x5 = 25 squares
      10: { cellSize: 90, fontSize: 0.9, pillSize: 0.65, nameSize: 0.75 },  // 2x5 = 10 squares
      4: { cellSize: 150, fontSize: 1.8, pillSize: 0.9, nameSize: 1.0 },    // 2x2 = 4 squares
    };

    // Get configuration based on visual squares
    const config = sizeConfigBySquares[visualSquares] || {
      cellSize: 60,
      fontSize: 1.2,
      pillSize: 0.6,
      nameSize: 0.7
    };

    const mobileConfig = mobileSizeConfigBySquares[visualSquares] || {
      cellSize: 50,
      fontSize: 0.8,
      pillSize: 0.5,
      nameSize: 0.6
    };

    console.log(`Board sizing: backendSquares=100, visualSquares=${visualSquares}, logicalGrid=${logicalGridRows}x${logicalGridCols}, cellSize=${config.cellSize}px, mobileCellSize=${mobileConfig.cellSize}px`);

    return {
      '--cell-size': `${config.cellSize}px`,
      '--cell-height': `${config.cellSize}px`,
      '--cell-font-size': `${config.fontSize}rem`,
      '--pill-font-size': `${config.pillSize}rem`,
      '--name-font-size': `${config.nameSize}rem`,
      '--logical-cols': logicalGridCols,
      '--logical-rows': logicalGridRows,
      // Mobile-specific variables
      '--mobile-cell-size': `${mobileConfig.cellSize}px`,
      '--mobile-font-size': `${mobileConfig.fontSize}rem`,
      '--mobile-pill-size': `${mobileConfig.pillSize}rem`,
      '--mobile-name-size': `${mobileConfig.nameSize}rem`
    };
  }

  // Add method to calculate logical square dimensions
  private calculateLogicalSquareMapping() {
    // Backend always uses 100 squares (10x10), visual uses total_squares (25, 10, etc.)
    const backendTotalSquares = 100;
    const visualSquares = this.gameData?.total_squares || 25;

    this.displayGridSize = 10; // Always display 10x10 grid

    // Define grid configurations for different square counts
    const gridConfigs: Record<number, { rows: number; cols: number }> = {
      100: { rows: 10, cols: 10 },  // 10x10
      50: { rows: 5, cols: 10 },    // 5x10 (1x2 squares)
      25: { rows: 5, cols: 5 },     // 5x5
      10: { rows: 2, cols: 5 },     // 2x5
      4: { rows: 2, cols: 2 },      // 2x2
    };

    // Get the logical grid dimensions
    const config = gridConfigs[visualSquares] || { rows: Math.sqrt(visualSquares), cols: Math.sqrt(visualSquares) };
    this.logicalGridRows = config.rows;
    this.logicalGridCols = config.cols;
    this.logicalGridSize = Math.max(this.logicalGridRows, this.logicalGridCols); // For backward compatibility

    // Calculate how many display cells each logical square spans
    this.cellsPerLogicalSquareRow = this.displayGridSize / this.logicalGridRows;
    this.cellsPerLogicalSquareCol = this.displayGridSize / this.logicalGridCols;
    this.cellsPerLogicalSquare = Math.max(this.cellsPerLogicalSquareRow, this.cellsPerLogicalSquareCol); // For backward compatibility

    console.log(`Logical square mapping: backendSquares=${backendTotalSquares}, visualSquares=${visualSquares}, logicalGrid=${this.logicalGridRows}x${this.logicalGridCols}, cellsPerLogicalSquare=[${this.cellsPerLogicalSquareRow}, ${this.cellsPerLogicalSquareCol}]`);
  }

  // Method to convert display coordinates to logical square coordinates
  private getLogicalSquareCoordinates(displayRow: number, displayCol: number): { logicalRow: number; logicalCol: number } {
    const logicalRow = Math.floor(displayRow / this.cellsPerLogicalSquare);
    const logicalCol = Math.floor(displayCol / this.cellsPerLogicalSquare);
    return { logicalRow, logicalCol };
  }

  // Method to check if two display coordinates belong to the same logical square
  private areInSameLogicalSquare(row1: number, col1: number, row2: number, col2: number): boolean {
    const logical1 = this.getLogicalSquareCoordinates(row1, col1);
    const logical2 = this.getLogicalSquareCoordinates(row2, col2);
    return logical1.logicalRow === logical2.logicalRow && logical1.logicalCol === logical2.logicalCol;
  }

  // Method to get the representative (top-left) coordinates for a logical square
  private getLogicalSquareRepresentative(displayRow: number, displayCol: number): { row: number; col: number } {
    const { logicalRow, logicalCol } = this.getLogicalSquareCoordinates(displayRow, displayCol);
    return {
      row: logicalRow * this.cellsPerLogicalSquare,
      col: logicalCol * this.cellsPerLogicalSquare
    };
  }

  // Method to get all backend square coordinates for a given visual square (logical square)
  // This now accepts logical indices directly (0-4 for a 5x5 grid)
  private getAllSquareCoordinatesForLogicalSquare(logicalRow: number, logicalCol: number): { row: number; col: number }[] {
    console.log(`\n=== COORDINATE GENERATION DEBUG ===`);
    console.log(`Logical square indices: [${logicalRow}, ${logicalCol}]`);

    // Get the axis labels for this logical square directly
    const rowLabel = this.logicalRows[logicalRow];
    const colLabel = this.logicalCols[logicalCol];

    console.log(`Row axis label: "${rowLabel}"`);
    console.log(`Col axis label: "${colLabel}"`);
    console.log(`Full displayRows array:`, JSON.stringify(this.displayRows));
    console.log(`Full displayCols array:`, JSON.stringify(this.displayCols));
    console.log(`Full logicalRows:`, JSON.stringify(this.logicalRows));
    console.log(`Full logicalCols:`, JSON.stringify(this.logicalCols));

    // Parse the axis labels to get the individual numbers
    // Handle both '/' and newline separators
    const parseAxisLabel = (label: string | number): number[] => {
      const labelStr = String(label);
      // First try splitting by '/' for labels like "8/2"
      if (labelStr.includes('/')) {
        return labelStr.split('/').map(n => parseInt(n.trim(), 10));
      }
      // Then try splitting by newlines for labels like "9\n8\n0\n7\n5"
      if (labelStr.includes('\n')) {
        return labelStr.split('\n').map(n => parseInt(n.trim(), 10));
      }
      // If no separators, treat as a single number
      return [parseInt(labelStr.trim(), 10)];
    };

    const rowNumbers = parseAxisLabel(rowLabel);
    const colNumbers = parseAxisLabel(colLabel);

    console.log(`Parsed row numbers from label "${rowLabel}":`, rowNumbers);
    console.log(`Parsed col numbers from label "${colLabel}":`, colNumbers);

    // Create cartesian product - these numbers ARE the database coordinates
    const coordinates: { row: number; col: number }[] = [];
    for (const rowNum of rowNumbers) {
      for (const colNum of colNumbers) {
        coordinates.push({ row: rowNum, col: colNum });
        console.log(`  Adding coordinate: [${rowNum}, ${colNum}]`);
      }
    }

    console.log(`Final ${coordinates.length} coordinates:`, coordinates);
    console.log(`=== END DEBUG ===\n`);

    return coordinates;
  }

  // Helper methods to get representative row/col from logical index
  getRepresentativeRow(logicalRowIndex: number): number {
    // Get the first display row for this logical row group
    const displayRowIndex = logicalRowIndex * this.cellsPerLogicalSquare;
    return this.displayRows[displayRowIndex];
  }

  getRepresentativeCol(logicalColIndex: number): number {
    // Get the first display col for this logical col group
    const displayColIndex = logicalColIndex * this.cellsPerLogicalSquare;
    return this.displayCols[displayColIndex];
  }

  // Logical square methods for template binding
  cellStatusLogical(logicalRowIndex: number, logicalColIndex: number): SquareStatus {
    // Get the representative backend square for this logical square
    const row = this.getRepresentativeRow(logicalRowIndex);
    const col = this.getRepresentativeCol(logicalColIndex);
    return this.cellStatus(row, col);
  }

  cellClassLogical(logicalRowIndex: number, logicalColIndex: number) {
    const status = this.cellStatusLogical(logicalRowIndex, logicalColIndex);
    const isWinner = this.isWinningSquareLogical(logicalRowIndex, logicalColIndex);

    return {
      cell: true,
      [status]: true,
      empty: status === 'empty',
      winner: isWinner
    };
  }

  ariaLabelLogical(logicalRowIndex: number, logicalColIndex: number) {
    const status = this.cellStatusLogical(logicalRowIndex, logicalColIndex);
    const rowLabel = this.logicalRows[logicalRowIndex];
    const colLabel = this.logicalCols[logicalColIndex];

    if (status === 'empty') return `Empty square at row ${rowLabel}, column ${colLabel}`;
    if (status === 'pending') return `Pending request at row ${rowLabel}, column ${colLabel}`;
    if (status === 'approved') return `Locked square at row ${rowLabel}, column ${colLabel}`;
    return '';
  }

  cellClickLogical(logicalRowIndex: number, logicalColIndex: number) {
    // For 25-square games, we need to handle this differently
    // Don't convert to representative coordinates, just check status and generate coordinates directly
    const status = this.cellStatusLogical(logicalRowIndex, logicalColIndex);

    if (status === 'empty' && !this.admin()) {
      if (!this.isGameOpen()) {
        alert('This game is no longer accepting new square assignments. The game status is: ' + this.getGameStatus());
        return;
      }

      // Get coordinates directly using logical indices
      const coordinates = this.getAllSquareCoordinatesForLogicalSquare(logicalRowIndex, logicalColIndex);

      // Set modal with the first coordinate (for display purposes)
      this.modalRow.set(coordinates[0].row);
      this.modalCol.set(coordinates[0].col);
      this.modalCoordinates.set(coordinates);
      this.modalOpen.set(true);
    } else if (this.admin() && (status === 'pending' || status === 'approved')) {
      // For admin, get the representative square to decline
      const row = this.getRepresentativeRow(logicalRowIndex);
      const col = this.getRepresentativeCol(logicalColIndex);
      const squares = this.board.squares() || [];
      const sq = squares.find((s: Square) => Number(s.row_idx) === row && Number(s.col_idx) === col);
      if (sq) {
        this.decline(sq.id);
      }
    }
  }

  getSquareNameLogical(logicalRowIndex: number, logicalColIndex: number): string {
    // Get the representative backend square for this logical square
    const row = this.getRepresentativeRow(logicalRowIndex);
    const col = this.getRepresentativeCol(logicalColIndex);
    return this.getSquareName(row, col);
  }

  isWinningSquareLogical(logicalRowIndex: number, logicalColIndex: number): boolean {
    // Check if any of the backend squares in this logical square is a winner
    // For 25 squares, each logical square represents 4 backend squares (2x2)
    const startRow = logicalRowIndex * this.cellsPerLogicalSquare;
    const startCol = logicalColIndex * this.cellsPerLogicalSquare;

    for (let r = 0; r < this.cellsPerLogicalSquare; r++) {
      for (let c = 0; c < this.cellsPerLogicalSquare; c++) {
        const displayRowIndex = startRow + r;
        const displayColIndex = startCol + c;

        if (displayRowIndex < this.displayRows.length && displayColIndex < this.displayCols.length) {
          const row = this.displayRows[displayRowIndex];
          const col = this.displayCols[displayColIndex];

          if (this.isWinningSquare(row, col)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
