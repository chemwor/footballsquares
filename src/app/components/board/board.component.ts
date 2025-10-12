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
    <div *ngIf="shouldShowWinnerBanner()" class="winner-banner">
      <div class="banner-content">
        <h2>🎉 Congratulations to the winner! This game is now complete. 🎉</h2>
        <div *ngIf="getWinnerNames().length > 0" class="winner-names">
          <strong>Winners:</strong> {{ getWinnerNames().join(', ') }}
        </div>
      </div>
    </div>

    <div class="board-wrapper">
      <div class="axis-label x-axis">{{ gameData?.team1_name || 'Home Team' }}</div>
      <div class="axis-label y-axis">{{ gameData?.team2_name || 'Away Team' }}</div>

      <div class="table-container">
        <!-- Fixed corner -->
        <div class="corner-header"></div>

        <!-- Scrollable content area that includes both headers and grid -->
        <div class="scrollable-area">
          <!-- Row headers (sticky) -->
          <div class="row-headers">
            <div class="row-header-spacer"></div> <!-- Spacer for column headers -->
            <div *ngFor="let row of getDisplayRows()" class="row-header">{{ shouldShowAxisNumbers() ? row : '?' }}</div>
          </div>

          <!-- Content area with column headers and grid -->
          <div class="content-area">
            <!-- Column headers -->
            <div class="column-headers">
              <div *ngFor="let col of getDisplayCols()" class="col-header">{{ shouldShowAxisNumbers() ? col : '?' }}</div>
            </div>

            <!-- Grid content -->
            <div class="grid-content" [style.--cols]="size()">
              <ng-container *ngFor="let row of getDisplayRows()">
                <ng-container *ngFor="let col of getDisplayCols()">
                  <div
                    class="cell"
                    [ngClass]="cellClass(row, col)"
                    (click)="cellClick(row, col)"
                    tabindex="0"
                    [attr.aria-label]="ariaLabel(row, col)"
                  >
                    <ng-container [ngSwitch]="cellStatus(row, col)">
                      <span *ngSwitchCase="'empty'">+</span>
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
      </div> <!-- end .board-wrapper -->

    <!-- Modal should always be rendered at the top level for visibility -->
    <sq-request-modal
      [open]="modalOpen()"
      [row]="modalRow()"
      [col]="modalCol()"
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
  `,
  styles: [`
    :host { display: block; background: #181a1b; color: #eee; font-family: system-ui, sans-serif; padding: 2rem 0 2rem 2rem; }

    .board-wrapper {
      position: relative;
      padding: 3rem 0 0 0;
      margin: 0 0 0 2rem;
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
      left: 0;
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
      grid-template-rows: 50px repeat(var(--cols, 10), 58px);
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
      height: 58px;
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
      gap: 2px;
      padding: 2px;
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
      grid-template-rows: repeat(var(--cols, 10), 56px);
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
      font-size: 1.2rem;
      transition: background 0.2s;
      outline: none;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
      border-radius: 4px;
      box-sizing: border-box;
      width: 60px;
      height: 56px;
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

  constructor(public board: BoardService) {}

  async ngOnInit() {
    // Initialize board with game data if available
    const boardSize = this.gameData?.grid_size || this.gameData?.boardSize || this.size();
    const gameId = this.gameData?.id;

    if (gameId) {
      await this.board.initBoard(boardSize, gameId);
      // Load winning squares data
      await this.loadWinningSquares();
    } else {
      await this.board.initBoard(boardSize);
    }

    // Set up display rows and cols from game data
    this.initializeAxisNumbers();
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
        row_idx: winner.home_digit, // home_digit is the row (Y-axis)
        col_idx: winner.away_digit, // away_digit is the column (X-axis)
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
    const gridSize = this.gameData?.grid_size || this.size();

    // Use randomized axis numbers from database if available, otherwise fall back to sequential
    if (this.gameData?.x_axis_numbers && this.gameData?.y_axis_numbers) {
      // Use the randomized numbers from the database
      this.displayCols = this.gameData.x_axis_numbers.slice(0, gridSize);
      this.displayRows = this.gameData.y_axis_numbers.slice(0, gridSize);
      console.log('Player board using randomized axis numbers from database');
      console.log('X-axis (cols):', this.displayCols);
      console.log('Y-axis (rows):', this.displayRows);
    } else {
      // Fallback to sequential numbers if randomized numbers aren't available
      this.displayRows = Array.from({ length: gridSize }, (_, i) => i);
      this.displayCols = Array.from({ length: gridSize }, (_, i) => i);
      console.log('Player board using sequential fallback numbers');
    }
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
    return sq?.status ?? 'empty';
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
    if (status === 'empty' && !this.admin()) {
      this.modalRow.set(row);
      this.modalCol.set(col);
      this.modalOpen.set(true);
    } else if (this.admin() && (status === 'pending' || status === 'approved')) {
      const sq = this.board.squares().find((s: Square) => Number(s.row_idx) === row && Number(s.col_idx) === col);
      if (sq) this.decline(sq.id);
    }
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  async request({ name, email, userId }: { name: string; email: string; userId?: string }) {
    await this.board.requestSquare(this.modalRow(), this.modalCol(), name, email, userId);
    this.closeModal();
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
    return sq?.name ?? '';
  }

  shouldShowAxisNumbers(): boolean {
    // Always show axis numbers if the game is closed (final reveal)
    if (this.gameData?.status === 'closed') {
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
}
