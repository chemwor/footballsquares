import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { signal } from '@angular/core';
import { supabase } from '../../data-sources/supabase.client';

@Component({
  selector: 'sq-admin-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-panel">
      <h3>Pending Requests</h3>
      <div *ngIf="pendingSquares().length === 0">No pending squares.</div>
      <div *ngFor="let sq of pendingSquares()">
        <span>{{sq.name}}</span>
        <span>{{obfuscateEmail(sq.email!)}}</span>
        <span>[{{sq.row_idx}},{{sq.col_idx}}]</span>
        <button (click)="approve(sq.id)" class="approve">Approve</button>
        <button (click)="decline(sq.id)" class="decline">Decline</button>
      </div>
      <h3>Approved Squares</h3>
      <div *ngFor="let sq of approvedSquares()">
        <span>{{sq.name}}</span>
        <span>[{{sq.row_idx}},{{sq.col_idx}}]</span>
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
    .admin-panel h3 {
      margin-top: 0;
      color: #f7c873;
      font-size: 1.2rem;
    }
    .admin-panel div {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
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
      .admin-panel h3 {
        font-size: 1rem;
      }
      .admin-panel div {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
        margin-bottom: 0.8rem;
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

    } catch (err) {
      console.error('Unexpected error loading squares:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async approve(squareId: string) {
    try {
      const { error } = await supabase
        .from('squares')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('id', squareId)
        .eq('game_id', this.gameData.id);

      if (error) {
        console.error('Error approving square:', error);
        return;
      }

      this.actionConfirmed.set('Square approved successfully!');
      await this.loadSquares(); // Refresh the lists
      this.hideConfirmationAfterDelay();

    } catch (err) {
      console.error('Error approving square:', err);
    }
  }

  async decline(squareId: string) {
    try {
      const { error } = await supabase
        .from('squares')
        .update({
          status: 'empty',
          name: null,
          email: null,
          requested_at: null,
          approved_at: null
        })
        .eq('id', squareId)
        .eq('game_id', this.gameData.id);

      if (error) {
        console.error('Error declining square:', error);
        return;
      }

      this.actionConfirmed.set('Square declined successfully!');
      await this.loadSquares(); // Refresh the lists
      this.hideConfirmationAfterDelay();

    } catch (err) {
      console.error('Error declining square:', err);
    }
  }

  obfuscateEmail(email: string): string {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    const visible = user.slice(0, 3);
    return `${visible}${'*'.repeat(Math.max(0, user.length - 3))}@${domain}`;
  }

  private hideConfirmationAfterDelay() {
    setTimeout(() => {
      this.actionConfirmed.set(null);
    }, 3000);
  }
}
