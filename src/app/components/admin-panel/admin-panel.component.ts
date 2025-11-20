import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { signal, computed } from '@angular/core';
import { supabase } from '../../data-sources/supabase.client';

@Component({
  selector: 'sq-admin-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-panel">
      <!-- Pending Requests Accordion -->
      <div class="accordion-section">
        <div class="accordion-header" (click)="togglePending()">
          <h3>
            <span class="accordion-icon" [class.open]="isPendingOpen()">▶</span>
            Pending Requests ({{board.groupedPendingRequests().length}})
          </h3>
        </div>
        <div class="accordion-content" [class.open]="isPendingOpen()">
          <div *ngIf="board.groupedPendingRequests().length === 0" class="empty-message">No pending requests.</div>
          <div *ngFor="let group of board.groupedPendingRequests()" class="request-group">
            <div class="request-header">
              <span class="player-name">{{group.playerName}}</span>
              <a href="mailto:{{group.playerEmail}}" class="email-link">{{obfuscateEmail(group.playerEmail)}}</a>
            </div>
            <div class="coordinates-section">
              <div class="coordinates-info">
                <span *ngIf="group.isGroup" class="square-count">{{group.squares.length}} squares requested together:</span>
                <span *ngIf="!group.isGroup" class="square-count">Single square requested:</span>
                <!-- Game size context -->
                <div style="font-size: 0.8rem; color: #aaa; margin-top: 0.1rem;">
                  {{board.gridSize()}}×{{board.gridSize()}} game ({{getExpectedSquaresText()}})
                </div>
              </div>
              <div class="coordinates-container">
                <div class="coordinates" [ngClass]="{'multi-square': group.isGroup}">
                  <ng-container *ngFor="let square of group.squares; let i = index; trackBy: trackSquare">
                    <span class="coordinate-item">[{{square.row_idx}},{{square.col_idx}}]</span><span *ngIf="i < group.squares.length - 1" class="coordinate-separator"> • </span>
                  </ng-container>
                </div>
                <div *ngIf="group.isGroup" class="group-indicator">
                  All {{group.squares.length}} squares will be processed together
                </div>
                <div *ngIf="!group.isGroup && getExpectedSquaresPerRequest() > 1" class="incomplete-group-indicator">
                  Expected {{getExpectedSquaresPerRequest()}} squares for this game size - player may submit more
                </div>
              </div>
            </div>
            <div class="request-actions">
              <button (click)="approveGroup(group.groupId, group.squares)" class="approve-btn">
                Approve {{group.isGroup ? 'All' : ''}}
              </button>
              <button (click)="declineGroup(group.groupId, group.squares)" class="decline-btn">
                Decline {{group.isGroup ? 'All' : ''}}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Approved Squares Accordion -->
      <div class="accordion-section">
        <div class="accordion-header" (click)="toggleApproved()">
          <h3>
            <span class="accordion-icon" [class.open]="isApprovedOpen()">▶</span>
            Approved Squares ({{approvedSquares().length}})
          </h3>
        </div>
        <div class="accordion-content" [class.open]="isApprovedOpen()">
          <div *ngIf="approvedSquares().length === 0" class="empty-message">No approved squares yet.</div>
          <div *ngFor="let sq of approvedSquares()" class="square-item">
            <span>{{sq.name}}</span>
            <span>[{{sq.row_idx}},{{sq.col_idx}}]</span>
          </div>
        </div>
      </div>

      <div *ngIf="actionConfirmed()" class="confirmation-modal" (click)="actionConfirmed.set(null)">
        {{actionConfirmed()}}
      </div>
    </div>
  `,
  styles: [
    `.admin-panel {
      background: #181a1b;
      border-radius: 12px;
      padding: 1rem;
      margin-top: 2rem;
      color: #fff;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .accordion-section {
      margin-bottom: 1rem;
      border: 1px solid #333;
      border-radius: 8px;
      overflow: hidden;
    }
    .accordion-header {
      background: #2a2d2e;
      padding: 0.75rem 1rem;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s;
    }
    .accordion-header:hover {
      background: #333638;
    }
    .accordion-header h3 {
      margin: 0;
      color: #f7c873;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .accordion-icon {
      font-size: 0.8rem;
      transition: transform 0.2s ease;
      color: #ccc;
    }
    .accordion-icon.open {
      transform: rotate(90deg);
    }
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      background: #1e2021;
    }
    .accordion-content.open {
      max-height: 80vh;
      overflow-y: auto;
      transition: max-height 0.3s ease-in;
    }
    .empty-message {
      padding: 1rem;
      color: #888;
      font-style: italic;
    }
    .square-item {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #333;
    }
    .square-item:last-child {
      border-bottom: none;
    }
    button {
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1.2rem;
      cursor: pointer;
      font-weight: 500;
      font-size: 1.1rem;
      color: #fff;
      transition: background 0.2s;
      min-width: 100px;
    }
    button.approve {
      background: #2ecc40;
    }
    button.approve:hover {
      background: #27ae36;
    }
    button.decline {
      background: #e74c3c;
    }
    button.decline:hover {
      background: #c0392b;
    }
    .confirmation-modal {
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      background: #222;
      color: #2ecc40;
      padding: 1rem 2rem;
      border-radius: 10px;
      font-size: 1.2rem;
      box-shadow: 0 2px 16px #000a;
      z-index: 9999;
      cursor: pointer;
      text-align: center;
      animation: fadeIn 0.2s;
      max-width: 90vw;
      word-break: break-word;
    }
    .email-link {
      color: #4a9eff;
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s;
      border-radius: 4px;
      padding: 0.2rem 0.4rem;
      background: rgba(74, 158, 255, 0.1);
    }
    .email-link:hover {
      color: #66b3ff;
      background: rgba(74, 158, 255, 0.2);
      text-decoration: underline;
    }
    .request-group {
      border-bottom: 1px solid #333;
      padding: 0.75rem 1rem;
    }
    .request-group:last-child {
      border-bottom: none;
    }
    .request-header {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
    }
    .player-name {
      font-weight: bold;
      color: #f7c873;
    }
    .coordinates-section {
      margin-bottom: 0.5rem;
    }
    .coordinates-info {
      font-size: 0.9rem;
      color: #ccc;
      margin-bottom: 0.2rem;
    }
    .coordinates-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .coordinates {
      color: #fff;
      font-family: monospace;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      display: flex;
      flex-wrap: wrap;
      gap: 0.2rem;
    }
    .coordinate-item {
      background: rgba(46, 204, 64, 0.2);
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      border: 1px solid rgba(46, 204, 64, 0.3);
    }
    .coordinate-separator {
      color: #2ecc40;
    }
    .group-indicator {
      font-size: 0.85rem;
      color: #fff;
      background: rgba(46, 204, 64, 0.3);
      padding: 0.4rem 0.6rem;
      border-radius: 4px;
      text-align: center;
      margin-top: 0.5rem;
    }
    .incomplete-group-indicator {
      font-size: 0.85rem;
      color: #e67e22;
      background: rgba(230, 126, 34, 0.3);
      padding: 0.4rem 0.6rem;
      border-radius: 4px;
      text-align: center;
      margin-top: 0.5rem;
    }
    .request-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .approve-btn {
      background: #2ecc40;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-weight: 500;
      color: #fff;
      transition: background 0.2s;
    }
    .approve-btn:hover {
      background: #27ae36;
    }
    .decline-btn {
      background: #e74c3c;
      border: none;
      border-radius: 6px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-weight: 500;
      color: #fff;
      transition: background 0.2s;
    }
    .decline-btn:hover {
      background: #c0392b;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @media (max-width: 600px) {
      .admin-panel {
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 8px;
        max-width: 100vw;
      }
      .accordion-header h3 {
        font-size: 1rem;
      }
      .request-group {
        padding: 0.5rem;
      }
      .request-header {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
      }
      .request-actions {
        justify-content: stretch;
      }
      .approve-btn, .decline-btn {
        flex: 1;
        text-align: center;
      }
      .square-item {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
        margin-bottom: 0.8rem;
        padding: 0.5rem;
      }
      button {
        font-size: 1rem;
        padding: 0.8rem 1.2rem;
        min-width: 80px;
      }
      .confirmation-modal {
        font-size: 1rem;
        padding: 0.8rem 1rem;
        top: 10%;
      }
    }
    `
  ]
})
export class AdminPanelComponent implements OnInit, OnChanges {
  @Input() gameData: any = null;

  pendingSquares = signal<any[]>([]);
  approvedSquares = signal<any[]>([]);
  actionConfirmed = signal<string | null>(null);
  loading = signal<boolean>(false);

  // Accordion state signals
  private pendingOpen = signal<boolean>(false);
  private approvedOpen = signal<boolean>(false);

  // Computed signals for accordion state
  isPendingOpen = computed(() => this.pendingOpen());
  isApprovedOpen = computed(() => this.approvedOpen());

  constructor(public board: BoardService) {}

  async ngOnInit() {
    console.log('AdminPanel ngOnInit - gameData:', this.gameData);
    if (this.gameData?.id) {
      // Initialize board service with the game ID and game data
      this.board.setGameId(this.gameData.id);
      this.board.setGameData(this.gameData);
      await this.board.initBoard(10, this.gameData.id);
      await this.loadSquares();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('AdminPanel ngOnChanges - gameData changed:', changes['gameData']);
    if (changes['gameData'] && this.gameData?.id) {
      // Update board service with new game ID and game data
      this.board.setGameId(this.gameData.id);
      this.board.setGameData(this.gameData);
      await this.board.initBoard(10, this.gameData.id);
      await this.loadSquares();
    }
  }

  async loadSquares() {
    if (!this.gameData?.id) {
      console.log('No gameData.id available, cannot load squares');
      return;
    }

    console.log('Loading squares for game:', this.gameData.id);
    this.loading.set(true);
    try {
      // Use board service to load squares which will update the computed signals
      await this.board.loadSquares();

      // Also load approved squares for our local display
      const { data, error } = await supabase
        .from('squares')
        .select('*')
        .eq('game_id', this.gameData.id)
        .eq('status', 'approved');

      if (error) {
        console.error('Error loading approved squares:', error);
      } else {
        console.log('Approved squares:', data);
        this.approvedSquares.set(data || []);
      }

      // Auto-open pending accordion if there are pending groups
      if (this.board.groupedPendingRequests().length > 0) {
        this.pendingOpen.set(true);
      }

    } catch (err) {
      console.error('Unexpected error loading squares:', err);
    } finally {
      this.loading.set(false);
    }
  }

  togglePending() {
    this.pendingOpen.set(!this.pendingOpen());
  }

  toggleApproved() {
    this.approvedOpen.set(!this.approvedOpen());
  }

  async approve(squareId: string) {
    try {
      await this.board.approve(squareId);
      this.actionConfirmed.set('Square approved successfully!');
      await this.loadSquares(); // Refresh the lists
      this.hideConfirmationAfterDelay();
    } catch (err) {
      console.error('Error approving square:', err);
    }
  }

  async decline(squareId: string) {
    try {
      await this.board.decline(squareId);
      this.actionConfirmed.set('Square declined successfully!');
      await this.loadSquares(); // Refresh the lists
      this.hideConfirmationAfterDelay();
    } catch (err) {
      console.error('Error declining square:', err);
    }
  }

  async approveGroup(groupId: string, squares: any[]) {
    try {
      await this.board.approveGroup(groupId, squares);
      this.actionConfirmed.set(`Successfully approved ${squares.length} square${squares.length > 1 ? 's' : ''}!`);
      await this.loadSquares(); // Refresh the lists
      this.hideConfirmationAfterDelay();
    } catch (err) {
      console.error('Error approving group:', err);
      this.actionConfirmed.set('Error approving squares. Please try again.');
      this.hideConfirmationAfterDelay();
    }
  }

  async declineGroup(groupId: string, squares: any[]) {
    try {
      await this.board.declineGroup(groupId, squares);
      this.actionConfirmed.set(`Successfully declined ${squares.length} square${squares.length > 1 ? 's' : ''}!`);
      await this.loadSquares(); // Refresh the lists
      this.hideConfirmationAfterDelay();
    } catch (err) {
      console.error('Error declining group:', err);
      this.actionConfirmed.set('Error declining squares. Please try again.');
      this.hideConfirmationAfterDelay();
    }
  }

  obfuscateEmail(email: string): string {
    if (!email) return '';
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    const visible = user.slice(0, 3);
    return `${visible}${'*'.repeat(Math.max(0, user.length - 3))}@${domain}`;
  }

  trackSquare(index: number, square: any): any {
    return square.id || index;
  }

  getExpectedSquaresPerRequest(): number {
    // Use the actual total_squares from the game data instead of calculating from grid_size
    const totalSquares = this.gameData?.total_squares || (this.board.gridSize() * this.board.gridSize());

    if (totalSquares >= 100) {
      return 1; // 100 squares = individual squares
    } else if (totalSquares >= 64) {
      return 2; // 64 squares = pairs
    } else if (totalSquares >= 25) {
      return 4; // 25 squares = quads
    } else {
      return Math.max(1, Math.floor(totalSquares / 10)); // Smaller games = more squares per request
    }
  }

  getExpectedSquaresText(): string {
    const expected = this.getExpectedSquaresPerRequest();
    const totalSquares = this.gameData?.total_squares || (this.board.gridSize() * this.board.gridSize());

    if (expected === 1) {
      return `typically 1 square per request (${totalSquares} squares total)`;
    } else if (expected === 2) {
      return `typically 2 squares per request (${totalSquares} squares total)`;
    } else if (expected === 4) {
      return `typically 4 squares per request (${totalSquares} squares total)`;
    } else {
      return `typically ${expected} squares per request (${totalSquares} squares total)`;
    }
  }

  private hideConfirmationAfterDelay() {
    setTimeout(() => {
      this.actionConfirmed.set(null);
    }, 3000);
  }
}
