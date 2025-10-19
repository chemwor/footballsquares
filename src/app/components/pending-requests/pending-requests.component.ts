import { Component, OnInit, computed, Input, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../services/board.service';
import { AuthService } from '../../services/auth.service';
import { Square } from '../../models/square.model';
import { supabase } from '../../data-sources/supabase.client';
import { SwiperDirective } from '@components/swiper-directive.component';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'pending-requests',
  standalone: true,
  imports: [CommonModule, SwiperDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div>
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0" style="padding-bottom: 20px">
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
                <div class="swiper">
                  <swiper-container
                    [config]="swiperConfig"
                    init="false"
                    class="swiper-wrapper"
                  >
                    <ng-container *ngFor="let square of userPendingRequests(); trackBy: trackBySquareId">
                      <swiper-slide class="swiper-slide pending-slide">
                        <div class="card border-warning bg-light h-100">
                          <div class="card-body p-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                              <div class="d-flex align-items-center">
                                <div *ngIf="shouldShowActualCoordinates(square)" class="square-position-badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                                  [{{ getDisplayRow(square.row_idx) }}, {{ getDisplayCol(square.col_idx) }}]
                                </div>
                                <div *ngIf="!shouldShowActualCoordinates(square)" class="square-position-badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold">
                                  [?, ?]
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
                                    <h6 class="mb-0 fw-bold">{{ getGameName(square) }}</h6>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="detail-item text-center">
                                    <small class="text-muted d-block mb-1">Home Team</small>
                                    <p class="mb-0 fw-medium">{{ getHomeTeam(square) }}</p>
                                  </div>
                                </div>
                                <div class="col-6">
                                  <div class="detail-item text-center">
                                    <small class="text-muted d-block mb-1">Away Team</small>
                                    <p class="mb-0 fw-medium">{{ getAwayTeam(square) }}</p>
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
                      </swiper-slide>
                    </ng-container>
                  </swiper-container>
                </div>
                <div class="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
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
    .swiper {
      padding-bottom: 1rem;
      width: 100% !important;
      overflow: visible !important;
      scroll-snap-type: x mandatory;
    }
    .swiper-wrapper {
      width: 100% !important;
      overflow: visible !important;
      display: flex;
      align-items: center;
    }
    .swiper-slide, .pending-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto !important;
      max-width: none !important;
      min-width: 0;
      overflow: visible !important;
      scroll-snap-align: center;
    }
    .pending-slide > .card {
      width: 350px;
      margin: 0 auto;
      min-width: 320px;
      max-width: 100%;
      height: auto;
      overflow: visible !important;
      box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
      border: 1px solid rgba(0,0,0,0.125);
    }
    .pending-slide .card.h-100 {
      height: auto !important;
    }
    @media (max-width: 600px) {
      .pending-slide > .card {
        width: 90vw;
        min-width: 0;
      }
    }
    .pending-requests-slide, .col-lg-10, .container {
      width: 100% !important;
      max-width: 100% !important;
      overflow: visible !important;
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
      .square-position-badge {
        font-size: 0.8rem;
        padding: 0.5rem 1rem !important;
      }
    }
    `
  ]
})
export class PendingRequestsComponent implements OnInit, AfterViewInit {
  @Input() gameData: any = null; // Keep for backward compatibility but we'll fetch per square

  currentSlide = 0;
  gameCache = new Map<string, any>(); // Cache games by game_id

  swiperConfig: SwiperOptions = {
    spaceBetween: 24,
    slidesPerView: 'auto',
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '768': { slidesPerView: 2 },
      '1200': { slidesPerView: 3 },
      '1600': { slidesPerView: 4 },
    },
  };

  constructor(
    public boardService: BoardService,
    public authService: AuthService
  ) {}

  // Computed property to filter pending requests for the current user
  userPendingRequests = computed(() => {
    const user = this.authService.user();
    if (!user) return [];

    const pendingRequests = this.boardService.pendingRequests();
    return pendingRequests.filter((req: any) => req.user_id === user.id && req.status === 'pending');
  });

  async loadGameDataForSquare(square: Square): Promise<void> {
    if (!square.game_id) {
      console.warn('Square has no game_id:', square);
      return;
    }

    // Check cache first
    if (this.gameCache.has(square.game_id)) {
      return;
    }

    try {
      // Fetch game data for this specific square
      const { data: game, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', square.game_id)
        .single();

      if (error) throw error;

      // Cache the result
      this.gameCache.set(square.game_id, game);
      console.log(`Loaded game data for square ${square.id}:`, game);
    } catch (error) {
      console.error(`Error loading game data for square ${square.id}:`, error);
    }
  }

  ngOnInit() {
    // Load squares - pending requests will update automatically via computed property
    this.boardService.loadSquares();
  }

  ngAfterViewInit() {
    // Move badge to right: -38px
    const badge = document.querySelector('.card-header .badge.bg-warning') as HTMLElement;
    if (badge) {
      badge.style.position = 'absolute';
      badge.style.right = '-38px';
    }
    // Remove scroll and allow section to expand
    const slideSection = document.querySelector('.pending-requests-slide') as HTMLElement;
    if (slideSection) {
      slideSection.style.overflow = 'visible';
      slideSection.style.height = 'auto';
      slideSection.style.maxHeight = 'none';
    }
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
    // Never show coordinates if axes are hidden, unless game is completely finished
    if (this.gameData?.hide_axes) {
      // Only show coordinates if game status is 'closed' or 'completed'
      return this.gameData?.status === 'closed' || this.gameData?.status === 'completed';
    }
    // If axes aren't hidden, always show coordinates
    return true;
  }

  async getGameDataForSquare(square: Square): Promise<any> {
    if (!square.game_id) {
      console.warn('Square has no game_id:', square);
      return this.gameData; // fallback to global gameData
    }

    // Check cache first
    if (this.gameCache.has(square.game_id)) {
      return this.gameCache.get(square.game_id);
    }

    try {
      // Fetch game data for this specific square
      const { data: game, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', square.game_id)
        .single();

      if (error) throw error;

      // Cache the result
      this.gameCache.set(square.game_id, game);
      console.log(`Loaded game data for square ${square.id}:`, game);

      return game;
    } catch (error) {
      console.error(`Error loading game data for square ${square.id}:`, error);
      return this.gameData; // fallback to global gameData
    }
  }

  shouldShowActualCoordinates(square: Square): boolean {
    const gameData = this.gameCache.get(square.game_id!) || this.gameData;

    // Removed debug logging
    // console.log('=== shouldShowActualCoordinates Debug ===');
    // console.log('square.game_id:', square.game_id);
    // console.log('gameData:', gameData);
    // console.log('gameData.hide_axes:', gameData?.hide_axes);
    // console.log('gameData.status:', gameData?.status);

    // If no gameData is available, default to showing coordinates
    if (!gameData) {
      // console.log('No gameData available, showing coordinates');
      return true;
    }

    // Show actual coordinates if axes are not hidden
    if (!gameData.hide_axes) {
      // console.log('Axes not hidden, showing actual coordinates');
      return true;
    }

    // If axes are hidden, only show coordinates if game is closed or completed
    const shouldShow = gameData.status === 'complete' ||
           gameData.status === 'closed' ||
           gameData.status === 'canceled';

    // console.log('Axes hidden, game finished?', shouldShow);
    // console.log('=== End Debug ===');

    return shouldShow;
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

  getGameName(square: Square): string {
    const gameData = this.gameCache.get(square.game_id!) || this.gameData;
    return gameData?.title || 'Game';
  }

  getHomeTeam(square: Square): string {
    const gameData = this.gameCache.get(square.game_id!) || this.gameData;
    return gameData?.team1_name || 'Team 1';
  }

  getAwayTeam(square: Square): string {
    const gameData = this.gameCache.get(square.game_id!) || this.gameData;
    return gameData?.team2_name || 'Team 2';
  }
}
