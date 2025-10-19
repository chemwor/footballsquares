import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { Pagination, Navigation } from 'swiper/modules'
import { supabase } from '../../../../../data-sources/supabase.client'
import { AuthService } from '../../../../../services/auth.service'
import { Router } from '@angular/router'

// register Swiper custom elements
register()

interface PendingSquare {
  id: string;
  row_idx: number;
  col_idx: number;
  name: string;
  email: string;
  requested_at: string;
  game_id: string;
  game_title: string;
  team1_name?: string;
  team2_name?: string;
}

@Component({
  selector: 'pending-approvals',
  standalone: true,
  imports: [CommonModule, SwiperDirective],
  templateUrl: './guides.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [`
    .pending-slide {
      height: auto;
      min-height: 420px;
    }

    .pending-card {
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      transition: all 0.4s ease;
      border: 1px solid rgba(255, 193, 7, 0.2);
      background: white;
      position: relative;
    }

    .pending-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #ffc107 0%, #ff8f00 100%);
    }

    .pending-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
      border-color: rgba(255, 193, 7, 0.4);
    }

    .pending-header {
      background: linear-gradient(135deg, #ffc107 0%, #ffb300 50%, #ff8f00 100%);
      color: #212529;
      padding: 2rem 1.5rem 1.5rem;
      position: relative;
      overflow: hidden;
    }

    .pending-header::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: rotate(45deg);
    }

    .square-badge {
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      background: rgba(255, 255, 255, 0.95);
      color: #212529;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .game-title {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #212529;
      line-height: 1.3;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .request-date {
      font-size: 0.9rem;
      opacity: 0.85;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .requester-info {
      padding: 2rem 1.5rem 1.5rem;
      background: white;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .requester-name {
      font-size: 1.4rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 0.75rem;
      text-align: center;
    }

    .requester-email {
      color: #6c757d;
      font-size: 1rem;
      margin-bottom: 2rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 12px;
      border: 1px solid #e9ecef;
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: auto;
    }

    .btn-approve {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border: none;
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 4px 16px rgba(40, 167, 69, 0.3);
      min-width: 120px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-approve:hover {
      background: linear-gradient(135deg, #218838 0%, #1ea085 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(40, 167, 69, 0.4);
    }

    .btn-decline {
      background: linear-gradient(135deg, #dc3545 0%, #e83e4b 100%);
      border: none;
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 4px 16px rgba(220, 53, 69, 0.3);
      min-width: 120px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn-decline:hover {
      background: linear-gradient(135deg, #c82333 0%, #d42c3e 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(220, 53, 69, 0.4);
    }

    .btn-approve:disabled,
    .btn-decline:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .notification-badge {
      position: absolute;
      top: -12px;
      right: -38px;
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4); }
      50% { transform: scale(1.1); box-shadow: 0 6px 20px rgba(231, 76, 60, 0.6); }
      100% { transform: scale(1); box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4); }
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6c757d;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }

    .empty-state i {
      margin-bottom: 1.5rem;
    }

    .empty-state h3 {
      color: #28a745;
      margin-bottom: 1rem;
    }

    .view-more-card {
      height: 100%;
      border-radius: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
      position: relative;
      overflow: hidden;
    }

    .view-more-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transition: all 0.4s ease;
    }

    .view-more-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(102, 126, 234, 0.4);
    }

    .view-more-card:hover::before {
      top: -30%;
      right: -30%;
      transform: rotate(45deg);
    }

    .view-more-number {
      font-size: 4rem;
      font-weight: 800;
      margin-bottom: 1rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 1;
    }

    .view-more-text {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }

    .swiper-pagination {
      bottom: 15px !important;
    }

    .swiper-pagination-bullet {
      background: #ffc107;
      opacity: 0.4;
      width: 12px;
      height: 12px;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 2px 8px rgba(255, 193, 7, 0.5);
    }

    .swiper-button-next,
    .swiper-button-prev {
      display: none !important; // Hide navigation buttons completely
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }

    .loading-spinner .spinner-border {
      width: 3rem;
      height: 3rem;
      color: #ffc107;
    }

    .section-header {
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-weight: 800;
      color: white; // Changed from #212529 to white
      font-size: 2.5rem;
      margin-bottom: 0;
    }

    .refresh-btn {
      background: white;
      border: 2px solid #ffc107;
      color: #ffc107;
      border-radius: 12px;
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .refresh-btn:hover {
      background: #ffc107;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);
    }

    @media (max-width: 768px) {
      .action-buttons {
        flex-direction: column;
        gap: 0.75rem;
      }

      .btn-approve,
      .btn-decline {
        width: 100%;
        padding: 0.875rem 1.5rem;
      }

      .section-header h2 {
        font-size: 2rem;
      }

      .pending-header {
        padding: 1.5rem 1rem;
      }

      .requester-info {
        padding: 1.5rem 1rem;
      }
    }
  `]
})
export class PendingApprovalsComponent implements OnInit, OnDestroy {
  pendingSquares: PendingSquare[] = [];
  displayedSquares: PendingSquare[] = [];
  totalPendingCount = 0;
  loading = true;
  error = '';
  processingSquareId: string | null = null;
  showViewMore = false;

  swiperConfig: SwiperOptions = {
    modules: [Pagination, Navigation],
    spaceBetween: 24,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      '768': { slidesPerView: 2 },
      '1200': { slidesPerView: 3 },
      '1600': { slidesPerView: 4 },
    },
  }

  private refreshInterval: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadPendingApprovals();

    // Refresh data every 30 seconds
    this.refreshInterval = setInterval(() => {
      this.loadPendingApprovals();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  async loadPendingApprovals() {
    try {
      this.loading = true;
      this.error = '';

      // First, get all games that are open
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('id, title, status, starts_at, team1_name, team2_name')
        .eq('status', 'open')
        .order('starts_at', { ascending: true });

      if (gamesError) {
        console.error('Error fetching games:', gamesError);
        this.error = 'Failed to load games';
        return;
      }

      if (!games || games.length === 0) {
        this.pendingSquares = [];
        this.displayedSquares = [];
        this.totalPendingCount = 0;
        this.showViewMore = false;
        return;
      }

      // Get pending squares for all games
      const gameIds = games.map(g => g.id);
      const { data: pendingSquares, error: squaresError } = await supabase
        .from('squares')
        .select('id, row_idx, col_idx, name, email, requested_at, game_id')
        .in('game_id', gameIds)
        .eq('status', 'pending')
        .order('requested_at', { ascending: true });

      if (squaresError) {
        console.error('Error fetching pending squares:', squaresError);
        this.error = 'Failed to load pending requests';
        return;
      }

      // Map squares with game titles and teams
      const squaresWithGameTitles: PendingSquare[] = pendingSquares?.map(square => {
        const game = games.find(g => g.id === square.game_id);
        return {
          ...square,
          game_title: game?.title || 'Unknown Game',
          team1_name: game?.team1_name || '',
          team2_name: game?.team2_name || ''
        };
      }) || [];

      this.pendingSquares = squaresWithGameTitles;
      this.totalPendingCount = squaresWithGameTitles.length;

      // Show only first 5 for the slider, rest available via "View More"
      if (this.totalPendingCount > 5) {
        this.displayedSquares = squaresWithGameTitles.slice(0, 5);
        this.showViewMore = true;
      } else {
        this.displayedSquares = squaresWithGameTitles;
        this.showViewMore = false;
      }

    } catch (err) {
      console.error('Unexpected error loading pending approvals:', err);
      this.error = 'An unexpected error occurred';
    } finally {
      this.loading = false;
    }
  }

  async approveSquare(square: PendingSquare) {
    if (this.processingSquareId === square.id) return;

    this.processingSquareId = square.id;

    try {
      const { error } = await supabase
        .from('squares')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('id', square.id);

      if (error) {
        console.error('Error approving square:', error);
        alert('Failed to approve square. Please try again.');
        return;
      }

      // Refresh the data
      await this.loadPendingApprovals();

    } catch (err) {
      console.error('Error approving square:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      this.processingSquareId = null;
    }
  }

  async declineSquare(square: PendingSquare) {
    if (this.processingSquareId === square.id) return;

    const confirmed = confirm(`Are you sure you want to decline ${square.name}'s request for square ${square.row_idx + 1}-${square.col_idx + 1}?`);
    if (!confirmed) return;

    this.processingSquareId = square.id;

    try {
      const { error } = await supabase
        .from('squares')
        .update({
          status: 'empty',
          name: null,
          email: null,
          requested_at: null,
          user_id: null
        })
        .eq('id', square.id);

      if (error) {
        console.error('Error declining square:', error);
        alert('Failed to decline square. Please try again.');
        return;
      }

      // Refresh the data
      await this.loadPendingApprovals();

    } catch (err) {
      console.error('Error declining square:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      this.processingSquareId = null;
    }
  }

  viewAllPendingRequests() {
    this.router.navigate(['/all-pending-requests']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  getSquarePosition(square: PendingSquare): string {
    return `${square.row_idx + 1}-${square.col_idx + 1}`;
  }

  getRemainingCount(): number {
    return this.totalPendingCount - 5;
  }
}
