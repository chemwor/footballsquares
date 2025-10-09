import { Component, OnInit, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';
import { Square } from '../../models/square.model';

@Component({
  selector: 'pending-requests',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">
                <i class="ai-clock me-2"></i>
                My Pending Requests
              </h5>
              <span class="badge bg-warning">{{ userPendingRequests().length }}</span>
            </div>

            <div class="card-body">
              <!-- Loading State -->
              <div *ngIf="!authService.user()" class="text-center py-3">
                <div class="spinner-border spinner-border-sm text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mb-0 mt-2 text-muted small">Loading your requests...</p>
              </div>

              <!-- Not Logged In State -->
              <div *ngIf="authService.user() === null" class="text-center py-4">
                <i class="ai-user text-muted" style="font-size: 2rem;"></i>
                <h6 class="mt-3 mb-2">Sign In Required</h6>
                <p class="text-muted mb-3">Please sign in to view your pending square requests.</p>
                <a href="/auth/signin" class="btn btn-primary btn-sm">Sign In</a>
              </div>

              <!-- Empty State -->
              <div *ngIf="authService.user() && userPendingRequests().length === 0" class="text-center py-4">
                <i class="ai-check-circle text-success" style="font-size: 2rem;"></i>
                <h6 class="mt-3 mb-2">No Pending Requests</h6>
                <p class="text-muted mb-0">You don't have any pending square requests at the moment.</p>
              </div>

              <!-- Pending Requests Slide -->
              <div *ngIf="authService.user() && userPendingRequests().length > 0" class="pending-requests-slide">
                <!-- Navigation Controls -->
                <div class="d-flex justify-content-between align-items-center mb-3" *ngIf="userPendingRequests().length > 1">
                  <div class="slide-info">
                    <small class="text-muted">
                      {{ currentSlide + 1 }} of {{ userPendingRequests().length }} requests
                    </small>
                  </div>
                  <div class="slide-controls">
                    <button
                      class="btn btn-outline-secondary btn-sm me-2"
                      (click)="previousSlide()"
                      [disabled]="currentSlide === 0">
                      <i class="ai-chevron-left"></i>
                    </button>
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      (click)="nextSlide()"
                      [disabled]="currentSlide === userPendingRequests().length - 1">
                      <i class="ai-chevron-right"></i>
                    </button>
                  </div>
                </div>

                <!-- Slide Container -->
                <div class="slide-container">
                  <div
                    class="slide-wrapper"
                    [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'">
                    <div
                      *ngFor="let square of userPendingRequests(); let i = index; trackBy: trackBySquareId"
                      class="slide-item">
                      <div class="card border-warning bg-light h-100">
                        <div class="card-body p-4">
                          <div class="d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex align-items-center">
                              <div
                                *ngIf="shouldShowCoordinates()"
                                class="square-position-badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                                [{{ getDisplayRow(square.row_idx) }}, {{ getDisplayCol(square.col_idx) }}]
                              </div>
                              <div
                                *ngIf="!shouldShowCoordinates()"
                                class="square-position-badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                                Square
                              </div>
                            </div>
                            <span class="badge bg-warning text-dark fs-6">
                              <i class="ai-clock me-1"></i>
                              Pending
                            </span>
                          </div>

                          <div class="game-details mb-4">
                            <div class="row g-3">
                              <div class="col-12">
                                <div class="detail-item text-center">
                                  <small class="text-muted d-block mb-2">Game</small>
                                  <h6 class="mb-0 fw-bold">{{ getGameName() }}</h6>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="detail-item text-center">
                                  <small class="text-muted d-block mb-1">Home Team</small>
                                  <p class="mb-0 fw-medium">{{ getHomeTeam() }}</p>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="detail-item text-center">
                                  <small class="text-muted d-block mb-1">Away Team</small>
                                  <p class="mb-0 fw-medium">{{ getAwayTeam() }}</p>
                                </div>
                              </div>
                              <div class="col-12" *ngIf="square.requestedAt">
                                <div class="detail-item text-center">
                                  <small class="text-muted d-block mb-1">Requested On</small>
                                  <p class="mb-0">{{ formatDate(square.requestedAt) }}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="status-info p-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded">
                            <div class="d-flex align-items-center justify-content-center">
                              <i class="ai-info-circle me-2 text-warning"></i>
                              <small class="text-dark text-center">
                                <strong>Status:</strong> Waiting for admin approval
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Slide Indicators -->
                <div class="slide-indicators mt-3" *ngIf="userPendingRequests().length > 1">
                  <div class="d-flex justify-content-center">
                    <button
                      *ngFor="let request of userPendingRequests(); let i = index"
                      class="indicator"
                      [class.active]="i === currentSlide"
                      (click)="goToSlide(i)">
                    </button>
                  </div>
                </div>

                <!-- Info Message -->
                <div class="alert alert-info mt-4 mb-0" role="alert">
                  <div class="d-flex align-items-start">
                    <i class="ai-info-circle mt-1 me-2"></i>
                    <div>
                      <strong>About Pending Requests</strong><br>
                      <small class="text-muted">
                        Your square requests are being reviewed by an admin. You'll be notified once they're approved or if any changes are needed.
                      </small>
                    </div>
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
    .square-position-badge {
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }

    .card {
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      border: 1px solid rgba(0, 0, 0, 0.125);
    }

    .card.border-warning {
      border-color: #ffc107 !important;
    }

    .badge {
      font-size: 0.75rem;
    }

    .alert-info {
      background-color: #d1ecf1;
      border-color: #bee5eb;
      color: #0c5460;
    }

    /* Slide Styles */
    .slide-container {
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .slide-wrapper {
      display: flex;
      transition: transform 0.3s ease-in-out;
      width: 100%;
    }

    .slide-item {
      flex: 0 0 100%;
      width: 100%;
      padding: 0 0.5rem;
    }

    .slide-controls .btn {
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slide-indicators {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #dee2e6;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .indicator.active {
      background-color: #ffc107;
      border-color: #ffc107;
    }

    .indicator:hover {
      border-color: #ffc107;
      background-color: rgba(255, 193, 7, 0.3);
    }

    .detail-item {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 0.75rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .status-info {
      border-radius: 0.5rem;
    }

    @media (max-width: 768px) {
      .slide-controls {
        gap: 0.25rem;
      }

      .slide-controls .btn {
        min-width: 35px;
        height: 35px;
      }

      .square-position-badge {
        font-size: 0.8rem;
        padding: 0.5rem 1rem !important;
      }
    }
  `]
})
export class PendingRequestsComponent implements OnInit {
  @Input() gameData: any = null;

  currentSlide = 0;

  constructor(
    public boardService: BoardService,
    public authService: AuthService
  ) {}

  // Computed property to filter pending requests for the current user
  userPendingRequests = computed(() => {
    const user = this.authService.user();
    if (!user) return [];

    const pendingRequests = this.boardService.pendingRequests();
    return pendingRequests.filter((square: Square) =>
      square.user_id === user.id || square.email === user.email
    );
  });

  ngOnInit() {
    // Load squares when component initializes
    this.boardService.loadSquares();
  }

  trackBySquareId(index: number, square: Square): string {
    return square.id;
  }

  getDisplayRow(rowIdx: number | undefined): number {
    return rowIdx !== undefined ? rowIdx + 1 : 0;
  }

  getDisplayCol(colIdx: number | undefined): number {
    return colIdx !== undefined ? colIdx + 1 : 0;
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown';
    }
  }

  shouldShowCoordinates(): boolean {
    // Always show coordinates if the game is closed (final reveal)
    if (this.gameData?.status === 'closed') {
      return true;
    }
    // Otherwise, check the hide_axes flag from game data
    return !this.gameData?.hide_axes;
  }

  nextSlide() {
    if (this.currentSlide < this.userPendingRequests().length - 1) {
      this.currentSlide++;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
  }

  getGameName(): string {
    // Assuming gameData contains a 'name' property for the game
    return this.gameData?.name || 'N/A';
  }

  getHomeTeam(): string {
    // Assuming gameData contains home team information
    return this.gameData?.homeTeam?.name || 'N/A';
  }

  getAwayTeam(): string {
    // Assuming gameData contains away team information
    return this.gameData?.awayTeam?.name || 'N/A';
  }
}
