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
            Pending Requests ({{pendingSquares().length}})
          </h3>
        </div>
        <div class="accordion-content" [class.open]="isPendingOpen()">
          <div *ngIf="pendingSquares().length === 0" class="empty-message">No pending squares.</div>
          <div *ngFor="let sq of pendingSquares()" class="square-item">
            <span>{{sq.name}}</span>
            <a href="mailto:{{sq.email}}" class="email-link">{{sq.email}}</a>
            <span>[{{sq.row_idx}},{{sq.col_idx}}]</span>
            <button (click)="approve(sq.id)" class="approve">Approve</button>
            <button (click)="decline(sq.id)" class="decline">Decline</button>
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
      max-height: 1000px;
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
      await this.loadSquares();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('AdminPanel ngOnChanges - gameData changed:', changes['gameData']);
    if (changes['gameData'] && this.gameData?.id) {
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
      const { data, error } = await supabase
        .from('squares')
        .select('*')
        .eq('game_id', this.gameData.id)
        .in('status', ['pending', 'approved']);

      if (error) {
        console.error('Error loading squares:', error);
        return;
      }

      console.log('Raw squares data:', data);
      const pending = data?.filter(sq => sq.status === 'pending') || [];
      const approved = data?.filter(sq => sq.status === 'approved') || [];

      console.log('Pending squares:', pending);
      console.log('Approved squares:', approved);

      this.pendingSquares.set(pending);
      this.approvedSquares.set(approved);

      // Auto-open pending accordion if there are pending items
      if (pending.length > 0) {
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

  private hideConfirmationAfterDelay() {
    setTimeout(() => {
      this.actionConfirmed.set(null);
    }, 3000);
  }
}
