import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../data-sources/supabase.client';

@Component({
  selector: 'sq-user-squares',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-squares-container">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">
            <i class="ai-grid me-2"></i>
            My Squares
          </h5>
          <span class="badge bg-primary">{{ userSquares.length }}</span>
        </div>

        <div class="card-body">
          <!-- Loading State -->
          <div *ngIf="loading" class="text-center py-3">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mb-0 mt-2 text-muted small">Loading your squares...</p>
          </div>

          <!-- Error State -->
          <div *ngIf="error && !loading" class="alert alert-danger py-2 mb-0">
            <small>{{ error }}</small>
          </div>

          <!-- Empty State -->
          <div *ngIf="!loading && !error && userSquares.length === 0" class="text-center py-3">
            <i class="ai-grid text-muted" style="font-size: 2rem;"></i>
            <p class="text-muted mb-0 mt-2">You don't have any squares in this game yet.</p>
          </div>

          <!-- Squares List -->
          <div *ngIf="!loading && !error && userSquares.length > 0">
            <div class="row g-2">
              <div
                *ngFor="let square of userSquares"
                class="col-6 col-md-4 col-lg-3"
              >
                <div class="square-card" [ngClass]="getSquareClass(square)">
                  <div class="square-position">
                    <span *ngIf="shouldShowCoordinates()" class="coordinates">
                      [{{ getDisplayRow(square.row_idx) }}, {{ getDisplayCol(square.col_idx) }}]
                    </span>
                    <span *ngIf="!shouldShowCoordinates()" class="coordinates-hidden">
                      [?, ?]
                    </span>
                  </div>
                  <div class="square-status">
                    <span class="status-badge" [ngClass]="getStatusClass(square)">
                      {{ square.status | titlecase }}
                    </span>
                  </div>
                  <div *ngIf="square.name" class="square-name">
                    {{ square.name }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary -->
            <div class="mt-3 pt-3 border-top">
              <div class="row text-center">
                <div class="col-4">
                  <div class="stat-item">
                    <div class="stat-number text-warning">{{ getPendingCount() }}</div>
                    <div class="stat-label">Pending</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <div class="stat-number text-success">{{ getApprovedCount() }}</div>
                    <div class="stat-label">Approved</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="stat-item">
                    <div class="stat-number text-primary">{{ userSquares.length }}</div>
                    <div class="stat-label">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-squares-container {
      margin-bottom: 2rem;
    }

    .card {
      border: 1px solid #444;
      background: #2a2d30;
      color: #fff;
    }

    .card-header {
      background: #1a1d20;
      border-bottom: 1px solid #444;
      padding: 1rem;
    }

    .card-body {
      padding: 1rem;
    }

    .square-card {
      background: #3a3d40;
      border: 2px solid #444;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: center;
      transition: all 0.2s ease;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .square-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .square-card.pending {
      border-color: #f7c873;
      background: rgba(247, 200, 115, 0.1);
    }

    .square-card.approved {
      border-color: #2ecc40;
      background: rgba(46, 204, 64, 0.1);
    }

    .coordinates {
      font-weight: bold;
      color: #f7c873;
      font-size: 0.9rem;
    }

    .coordinates-hidden {
      font-weight: bold;
      color: #999;
      font-size: 0.9rem;
    }

    .square-status {
      margin: 0.25rem 0;
    }

    .status-badge {
      padding: 0.2rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: bold;
    }

    .status-badge.pending {
      background: #f7c873;
      color: #000;
    }

    .status-badge.approved {
      background: #2ecc40;
      color: #fff;
    }

    .square-name {
      font-size: 0.8rem;
      color: #ccc;
      margin-top: 0.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .stat-item {
      padding: 0.5rem;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.8rem;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    @media (max-width: 576px) {
      .square-card {
        min-height: 70px;
        padding: 0.5rem;
      }

      .coordinates,
      .coordinates-hidden {
        font-size: 0.8rem;
      }

      .stat-number {
        font-size: 1.2rem;
      }
    }
  `]
})
export class UserSquaresComponent implements OnInit {
  @Input() gameData: any = null;

  userSquares: any[] = [];
  loading: boolean = false;
  error: string = '';

  async ngOnInit() {
    if (this.gameData?.id) {
      await this.loadUserSquares();
    }
  }

  async loadUserSquares() {
    this.loading = true;
    this.error = '';

    try {
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        this.userSquares = [];
        this.loading = false;
        return;
      }

      // Fetch squares belonging to the current user for this game
      const { data: squares, error } = await supabase
        .from('squares')
        .select('*')
        .eq('game_id', this.gameData.id)
        .eq('user_id', user.id)
        .in('status', ['pending', 'approved'])
        .order('row_idx')
        .order('col_idx');

      if (error) {
        console.error('Error fetching user squares:', error);
        this.error = 'Failed to load your squares.';
        this.userSquares = [];
      } else {
        this.userSquares = squares || [];
        console.log('Loaded user squares:', this.userSquares);
      }
    } catch (err) {
      console.error('Unexpected error loading user squares:', err);
      this.error = 'An unexpected error occurred.';
      this.userSquares = [];
    }

    this.loading = false;
  }

  shouldShowCoordinates(): boolean {
    // Always show coordinates if the game is closed (final reveal)
    if (this.gameData?.status === 'closed') {
      return true;
    }
    // Otherwise, check the hide_axes flag from game data
    return !this.gameData?.hide_axes;
  }

  getDisplayRow(rowIdx: number): number {
    if (this.gameData?.y_axis_numbers && this.gameData.y_axis_numbers.length > rowIdx) {
      return this.gameData.y_axis_numbers[rowIdx];
    }
    return rowIdx;
  }

  getDisplayCol(colIdx: number): number {
    if (this.gameData?.x_axis_numbers && this.gameData.x_axis_numbers.length > colIdx) {
      return this.gameData.x_axis_numbers[colIdx];
    }
    return colIdx;
  }

  getSquareClass(square: any): string {
    return square.status?.toLowerCase() || 'empty';
  }

  getStatusClass(square: any): string {
    return square.status?.toLowerCase() || 'empty';
  }

  getPendingCount(): number {
    return this.userSquares?.filter(s => s.status === 'pending').length || 0;
  }

  getApprovedCount(): number {
    return this.userSquares?.filter(s => s.status === 'approved').length || 0;
  }
}
