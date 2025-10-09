import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { Pagination } from 'swiper/modules'
import { supabase } from '../../../../../data-sources/supabase.client'
import { AuthService } from '../../../../../services/auth.service'

// register Swiper custom elements
register()

interface UserGame {
  id: string;
  title: string;
  status: string;
  starts_at: string;
  userSquares: UserSquare[];
  squareCount: number;
}

interface UserSquare {
  id: string;
  row_idx: number;
  col_idx: number;
  status: string;
  approved_at: string;
}

@Component({
  selector: 'current-user-games',
  standalone: true,
  imports: [CommonModule, SwiperDirective],
  templateUrl: './guides.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [`
    .user-game-slide {
      height: auto;
      min-height: 280px;
    }

    .user-game-card {
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      transition: all 0.4s ease;
      border: 1px solid rgba(40, 167, 69, 0.2);
      background: white;
      position: relative;
    }

    .user-game-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #28a745 0%, #20c997 100%);
    }

    .user-game-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
      border-color: rgba(40, 167, 69, 0.4);
    }

    .user-game-header {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      color: white;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }

    .user-game-header::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: rotate(45deg);
    }

    .game-status-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(255, 255, 255, 0.95);
      color: #28a745;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.3px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      text-transform: uppercase;
    }

    .user-game-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
      line-height: 1.3;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .game-date {
      font-size: 0.85rem;
      opacity: 0.9;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .game-content {
      padding: 1.5rem;
      background: white;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .squares-info {
      margin-bottom: 1.5rem;
    }

    .squares-count {
      font-size: 1.5rem;
      font-weight: 800;
      color: #28a745;
      margin-bottom: 0.25rem;
    }

    .squares-label {
      font-size: 0.9rem;
      color: #6c757d;
      font-weight: 500;
    }

    .squares-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .square-chip {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
      padding: 0.3rem 0.6rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid rgba(40, 167, 69, 0.2);
    }

    .game-actions {
      margin-top: auto;
      display: flex;
      justify-content: center;
    }

    .btn-view-game {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border: none;
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: 0 4px 16px rgba(40, 167, 69, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-decoration: none;
    }

    .btn-view-game:hover {
      background: linear-gradient(135deg, #218838 0%, #1ea085 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(40, 167, 69, 0.4);
      color: white;
      text-decoration: none;
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
      color: #28a745;
    }

    .section-header {
      margin-bottom: 3rem;
    }

    .section-header h2 {
      font-weight: 800;
      color: white;
      font-size: 2.2rem;
      margin-bottom: 0;
    }

    .refresh-btn {
      background: white;
      border: 2px solid #28a745;
      color: #28a745;
      border-radius: 12px;
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .refresh-btn:hover {
      background: #28a745;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
    }

    .swiper-pagination {
      bottom: 15px !important;
    }

    .swiper-pagination-bullet {
      background: #28a745;
      opacity: 0.4;
      width: 12px;
      height: 12px;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 2px 8px rgba(40, 167, 69, 0.5);
    }

    @media (max-width: 768px) {
      .section-header h2 {
        font-size: 1.8rem;
      }

      .user-game-header {
        padding: 1.2rem;
      }

      .game-content {
        padding: 1.2rem;
      }

      .squares-list {
        justify-content: center;
      }
    }
  `]
})
export class CurrentUserGamesComponent implements OnInit, OnDestroy {
  userGames: UserGame[] = [];
  loading = true;
  error = '';

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '768': { slidesPerView: 2 },
      '1200': { slidesPerView: 3 },
      '1600': { slidesPerView: 4 },
    },
  }

  private refreshInterval: any;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.loadUserGames();

    // Refresh data every 30 seconds
    this.refreshInterval = setInterval(() => {
      this.loadUserGames();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  async loadUserGames() {
    try {
      this.loading = true;
      this.error = '';

      // Get current user ID
      const currentUser = this.authService.user();
      if (!currentUser) {
        this.userGames = [];
        return;
      }

      // Get squares that belong to the current user (approved squares)
      const { data: userSquares, error: squaresError } = await supabase
        .from('squares')
        .select('id, row_idx, col_idx, status, approved_at, game_id')
        .eq('user_id', currentUser.id)
        .eq('status', 'approved')
        .order('approved_at', { ascending: false });

      if (squaresError) {
        console.error('Error fetching user squares:', squaresError);
        this.error = 'Failed to load your games';
        return;
      }

      if (!userSquares || userSquares.length === 0) {
        this.userGames = [];
        return;
      }

      // Get unique game IDs
      const gameIds = [...new Set(userSquares.map(square => square.game_id))];

      // Get game details for each game
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('id, title, status, starts_at')
        .in('id', gameIds)
        .order('starts_at', { ascending: false });

      if (gamesError) {
        console.error('Error fetching games:', gamesError);
        this.error = 'Failed to load game details';
        return;
      }

      // Combine games with user squares
      const userGamesWithSquares: UserGame[] = games?.map(game => {
        const gameSquares = userSquares.filter(square => square.game_id === game.id);
        return {
          id: game.id,
          title: game.title,
          status: game.status,
          starts_at: game.starts_at,
          userSquares: gameSquares,
          squareCount: gameSquares.length
        };
      }) || [];

      this.userGames = userGamesWithSquares;

    } catch (err) {
      console.error('Unexpected error loading user games:', err);
      this.error = 'An unexpected error occurred';
    } finally {
      this.loading = false;
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  getSquarePosition(square: UserSquare): string {
    return `${square.row_idx + 1}-${square.col_idx + 1}`;
  }
}
