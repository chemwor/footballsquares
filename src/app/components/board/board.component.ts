import { Component, signal, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../services/board.service';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { Square, SquareStatus } from '../../models/square.model';

@Component({
  selector: 'sq-board',
  standalone: true,
  imports: [CommonModule, FormsModule, RequestModalComponent],
  template: `

    <div class="board-container">
      <div class="axis-label x-axis">{{ gameData?.team2_name || 'Away Team' }}</div>
      <div class="axis-label y-axis">{{ gameData?.team1_name || 'Home Team' }}</div>
      <div class="board" [style.--cols]="size()">
        <div class="header corner"></div>
        <div *ngFor="let col of cols()" class="header">{{col}}</div>
        <ng-container *ngFor="let row of rows()">
          <div class="header">{{row}}</div>
          <ng-container *ngFor="let col of cols()">
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
                  <span class="pill approved">Locked</span>
                  <span class="name">{{getSquareName(row, col)}}</span>
                </span>
              </ng-container>
            </div>
          </ng-container>
        </ng-container>
      </div>
    </div> <!-- end .board-container -->

    <!-- Modal should always be rendered at the top level for visibility -->
    <sq-request-modal
      [open]="modalOpen()"
      [row]="modalRow()"
      [col]="modalCol()"
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
      //margin: 0 2rem;
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
      cursor: pointer;
      font-size: 1.2rem;
      transition: background 0.2s;
      outline: none;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.5rem;
    }
    .cell.empty:hover, .cell.empty:focus { background: #2c3136; }
    .cell.pending { background: #524726; }
    .cell.approved { background: #1e3a24; }
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
    .pill.pending { background: #f7c873; color: #000; }
    .pill.approved { background: #2ecc40; color: #fff; }
    .admin-panel { background: #222; border-radius: 12px; padding: 1rem; margin-top: 2rem; }
    .admin-panel h3 { margin-top: 0; }
    .admin-panel div { display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem; }
    button { background: #444; color: #fff; border: none; border-radius: 6px; padding: 0.3rem 0.8rem; cursor: pointer; }
    button:hover { background: #666; }
    select, input[type="checkbox"] { margin-left: 0.5rem; }
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

  modalOpen = signal(false);
  modalRow = signal<number>(0);
  modalCol = signal<number>(0);

  constructor(public board: BoardService) {}

  async ngOnInit() {
    // Initialize board with game data if available
    const boardSize = this.gameData?.boardSize || this.size();
    const gameId = this.gameData?.id;

    if (gameId) {
      await this.board.initBoard(boardSize, gameId);
    } else {
      await this.board.initBoard(boardSize);
    }
  }

  cellStatus(row: number, col: number): SquareStatus {
    const squares = this.board.squares() || [];
    const sq = squares.find(s => Number(s.row_idx) === row && Number(s.col_idx) === col);
    return sq?.status ?? 'empty';
  }

  cellClass(row: number, col: number) {
    const status = this.cellStatus(row, col);
    return { cell: true, [status]: true, empty: status === 'empty' };
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

  async request({ name, email }: { name: string; email: string }) {
    await this.board.requestSquare(this.modalRow(), this.modalCol(), name, email);
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
}
