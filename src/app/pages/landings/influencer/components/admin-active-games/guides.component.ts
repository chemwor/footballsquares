import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { Pagination } from 'swiper/modules'
import { supabase } from '../../../../../data-sources/supabase.client'
import { AuthService } from '../../../../../services/auth.service'
import { RouterModule } from '@angular/router'

// register Swiper custom elements
register()

interface AdminGame {
  id: string;
  title: string;
  status: string;
  starts_at: string;
  total_squares: number;
  approved_squares: number;
  pending_squares: number;
  empty_squares: number;
  pendingSquares?: any[]; // Add this to hold pending squares for the game
}

@Component({
  selector: 'admin-active-games',
  standalone: true,
  imports: [CommonModule, SwiperDirective, RouterModule],
  templateUrl: './guides.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: [`
    .admin-game-slide {
      height: auto;
      min-height: 240px; // Further reduced for square aspect ratio
    }

    .admin-game-card {
      height: 100%;
      border-radius: 12px; // Slightly smaller for more compact feel
      overflow: hidden;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      border: 1px solid rgba(102, 126, 234, 0.2);
      background: white;
      position: relative;
      aspect-ratio: 1; // Force square aspect ratio
    }

    .admin-game-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px; // Thinner accent line
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }

    .admin-game-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
      border-color: rgba(102, 126, 234, 0.4);
    }

    .admin-game-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.8rem; // More compact padding
      position: relative;
      overflow: hidden;
    }

    .admin-game-header::after {
      content: '';
      position: absolute;
      top: -30%;
      right: -15%;
      width: 40px; // Even smaller decorative element
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: rotate(45deg);
    }

    .game-status-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(255, 255, 255, 0.95);
      color: #667eea;
      padding: 0.2rem 0.5rem; // Very compact badge
      border-radius: 12px;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.2px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      text-transform: uppercase;
    }

    .admin-game-title {
      font-size: 0.95rem; // Smaller title for compact design
      font-weight: 700;
      margin-bottom: 0.3rem;
      color: white;
      line-height: 1.1;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; // Prevent title overflow
    }

    .game-date {
      font-size: 0.7rem; // Very compact date
      opacity: 0.85;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .game-stats {
      padding: 0.8rem; // Compact padding throughout
      background: white;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between; // Distribute space evenly
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr; // True 2x2 grid
      grid-template-rows: 1fr 1fr;
      gap: 0.4rem; // Tighter gaps
      margin-bottom: 0.8rem;
      flex-grow: 1;
    }

    .stat-card {
      background: #f8f9fa;
      border-radius: 6px; // Smaller radius for compact feel
      padding: 0.5rem 0.3rem; // Very compact padding
      text-align: center;
      border: 1px solid #e9ecef;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 50px; // Ensure consistent height
    }

    .stat-card:hover {
      background: #e9ecef;
      transform: scale(1.02); // Subtle scale instead of translate
    }

    .stat-card.pending {
      background: rgba(255, 193, 7, 0.1);
      border-color: rgba(255, 193, 7, 0.3);
    }

    .stat-card.approved {
      background: rgba(40, 167, 69, 0.1);
      border-color: rgba(40, 167, 69, 0.3);
    }

    .stat-card.empty {
      background: rgba(108, 117, 125, 0.1);
      border-color: rgba(108, 117, 125, 0.3);
    }

    .stat-number {
      font-size: 1.1rem; // Smaller numbers for compact design
      font-weight: 800;
      margin-bottom: 0.1rem;
      color: #212529;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.6rem; // Very small labels
      color: #6c757d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      line-height: 1;
    }

    .game-actions {
      display: flex;
      justify-content: center;
      padding-top: 0.2rem;
    }

    .btn-view-game {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      padding: 0.5rem 0.8rem; // Very compact button
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.7rem; // Small font
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
      text-transform: uppercase;
      letter-spacing: 0.2px;
      text-decoration: none;
      white-space: nowrap;
    }

    .btn-view-game:hover {
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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
      color: #667eea;
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
      color: #667eea;
    }

    .section-header {
      margin-bottom: 1.5rem; // Reduced margin
    }

    .section-header h2 {
      font-weight: 800;
      color: white;
      font-size: 1.8rem; // Smaller header
      margin-bottom: 0;
    }

    .refresh-btn {
      background: white;
      border: 2px solid #667eea;
      color: #667eea;
      border-radius: 8px; // Smaller radius
      padding: 0.6rem 1.2rem; // More compact
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .refresh-btn:hover {
      background: #667eea;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
    }

    .swiper-pagination {
      bottom: 10px !important; // Closer to cards
    }

    .swiper-pagination-bullet {
      background: #667eea;
      opacity: 0.4;
      width: 8px; // Smaller bullets
      height: 8px;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
      transform: scale(1.2);
      box-shadow: 0 2px 6px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      .stats-grid {
        gap: 0.3rem; // Even tighter on mobile
      }

      .section-header h2 {
        font-size: 1.5rem;
      }

      .admin-game-header {
        padding: 0.6rem;
      }

      .game-stats {
        padding: 0.6rem;
      }

      .admin-game-slide {
        min-height: 220px; // Very compact on mobile
      }

      .stat-card {
        min-height: 45px; // Smaller on mobile
      }

      .stat-number {
        font-size: 1rem;
      }

      .stat-label {
        font-size: 0.55rem;
      }
    }
  `]
})
export class AdminActiveGamesComponent implements OnInit, OnDestroy {
  adminGames: AdminGame[] = [];
  loading = true;
  error = '';
  loadingApprove: boolean = false;
  loadingDecline: boolean = false;

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

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.loadAdminGames();
    // Removed setInterval auto-refresh
  }

  ngOnDestroy() {
    // Removed auto-refresh cleanup
  }

  async loadAdminGames() {
    try {
      this.loading = true;
      this.error = '';
      const currentUser = this.authService.user();
      if (!currentUser) {
        this.adminGames = [];
        return;
      }
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('id, title, status, starts_at')
        .in('status', ['open', 'locked'])
        .order('starts_at', { ascending: true });
      if (gamesError) {
        console.error('Error fetching games:', gamesError);
        this.error = 'Failed to load games';
        return;
      }
      if (!games || games.length === 0) {
        this.adminGames = [];
        return;
      }
      const gamesWithStats: AdminGame[] = [];
      for (const game of games) {
        const { data: squares, error: squaresError } = await supabase
          .from('squares')
          .select('id, status, user_id, email, requested_at')
          .eq('game_id', game.id);
        if (squaresError) {
          console.error('Error fetching squares for game:', game.id, squaresError);
          continue;
        }
        const totalSquares = squares?.length || 0;
        const approvedSquares = squares?.filter(s => s.status === 'approved').length || 0;
        const pendingSquaresArr = squares?.filter(s => s.status === 'pending') || [];
        const pendingSquares = pendingSquaresArr.length;
        const emptySquares = squares?.filter(s => s.status === 'empty').length || 0;
        gamesWithStats.push({
          id: game.id,
          title: game.title,
          status: game.status,
          starts_at: game.starts_at,
          total_squares: totalSquares,
          approved_squares: approvedSquares,
          pending_squares: pendingSquares,
          empty_squares: emptySquares,
          pendingSquares: pendingSquaresArr, // Store pending squares for this game
        });
      }
      gamesWithStats.sort((a, b) => {
        const dateA = a.starts_at ? new Date(a.starts_at).getTime() : 0;
        const dateB = b.starts_at ? new Date(b.starts_at).getTime() : 0;
        return dateB - dateA;
      });
      this.adminGames = gamesWithStats;
    } catch (err) {
      console.error('Unexpected error loading admin games:', err);
      this.error = 'An unexpected error occurred';
    } finally {
      this.loading = false;
    }
  }

  async approveRequest(square: any, game: AdminGame) {
    this.loadingApprove = true;
    console.log(`[APPROVE] Attempting for square ${square.id} in game ${game.id}`);
    try {
      const { data, error } = await supabase
        .from('squares')
        .update({ status: 'approved' })
        .eq('id', square.id)
        .select();
      if (error) {
        console.error(`[APPROVE] Failed for square ${square.id} in game ${game.id}:`, error);
      } else {
        console.log(`[APPROVE] Success for square ${square.id} in game ${game.id}:`, data);
      }
      await this.loadAdminGames();
    } catch (err) {
      console.error(`[APPROVE] Unexpected error for square ${square.id} in game ${game.id}:`, err);
    } finally {
      this.loadingApprove = false;
      console.log(`[APPROVE] Finished for square ${square.id} in game ${game.id}`);
    }
  }

  async declineRequest(square: any, game: AdminGame) {
    this.loadingDecline = true;
    console.log(`[DECLINE] Attempting for square ${square.id} in game ${game.id}`);
    try {
      const { data, error } = await supabase
        .from('squares')
        .update({ status: 'declined' })
        .eq('id', square.id)
        .select();
      if (error) {
        console.error(`[DECLINE] Failed for square ${square.id} in game ${game.id}:`, error);
      } else {
        console.log(`[DECLINE] Success for square ${square.id} in game ${game.id}:`, data);
      }
      await this.loadAdminGames();
    } catch (err) {
      console.error(`[DECLINE] Unexpected error for square ${square.id} in game ${game.id}:`, err);
    } finally {
      this.loadingDecline = false;
      console.log(`[DECLINE] Finished for square ${square.id} in game ${game.id}`);
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

  getCompletionPercentage(game: AdminGame): number {
    if (game.total_squares === 0) return 0;
    return Math.round((game.approved_squares / game.total_squares) * 100);
  }
}
