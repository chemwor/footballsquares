import { Component, OnInit } from '@angular/core'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { supabase } from '../../../../../data-sources/supabase.client'
import { AuthService } from '../../../../../services/auth.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'discover-games-list',
  standalone: true,
  imports: [NgbPaginationModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './discover-games-list.component.html',
  styles: ``,
})
export class DiscoverGamesListComponent implements OnInit {
  games: any[] = [];
  filteredGames: any[] = [];
  paginatedGames: any[] = [];
  sports: any[] = [];
  selectedSport: string = '';
  loading: boolean = false;
  error: string = '';
  showSignInPrompt: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userResolved$
      .pipe(filter(resolved => resolved), take(1))
      .subscribe(() => {
        this.loadSports();
        this.loadDiscoverGames();
      });
  }

  async loadSports() {
    try {
      const { data, error } = await supabase
        .from('sports')
        .select('id, name')
        .order('name');

      if (error) {
        console.error('Error loading sports:', error);
        return;
      }

      this.sports = data || [];
    } catch (err) {
      console.error('Unexpected error loading sports:', err);
    }
  }

  async loadDiscoverGames() {
    this.loading = true;
    this.error = '';
    this.showSignInPrompt = false;

    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      this.games = [];
      this.filteredGames = [];
      this.paginatedGames = [];
      this.loading = false;
      this.error = 'Please sign in to discover games.';
      this.showSignInPrompt = true;
      return;
    }

    try {
      // Query all open games NOT owned by current user, ordered by newest first
      const { data, error } = await supabase
        .from('games')
        .select('id,title,sport,team1_name,team2_name,grid_size,status,claimed_count,pending_count,created_at,owner_name,instructions')
        .eq('status', 'open')
        .neq('owner_id', user.id) // NOT owned by current user
        .order('created_at', { ascending: false }); // Newest to oldest

      if (error) {
        this.games = [];
        this.filteredGames = [];
        this.paginatedGames = [];
        this.loading = false;
        this.error = 'Error fetching games.';
        console.error('Error fetching discover games:', error);
        return;
      }

      // Map games to UI format
      this.games = (data || []).map(g => ({
        id: g.id,
        image: 'assets/img/mma-1575854_1280.jpg',
        title: g.title,
        sport: g.sport || '',
        match: g.team1_name && g.team2_name ? `${g.team1_name} vs ${g.team2_name}` : '',
        boardSize: `${g.grid_size}x${g.grid_size}`,
        status: g.status,
        ownerName: g.owner_name || 'Unknown Host',
        excerpt: g.instructions ? `${g.instructions}` : `Join this open squares game! Claim your spot and compete for prizes.`,
        shares: g.claimed_count || 0,
        comments: g.pending_count || 0,
        date: g.created_at ? new Date(g.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
        category: g.sport || ''
      }));

      this.filteredGames = [...this.games];
      this.updatePagination();
      this.loading = false;
    } catch (err) {
      this.games = [];
      this.filteredGames = [];
      this.paginatedGames = [];
      this.loading = false;
      this.error = 'Unexpected error occurred while loading games.';
      console.error('Unexpected error loading discover games:', err);
    }
  }

  onSportFilterChange() {
    if (!this.selectedSport || this.selectedSport === '') {
      // Show all games if no filter selected
      this.filteredGames = [...this.games];
    } else {
      // Filter games by selected sport
      this.filteredGames = this.games.filter(game =>
        game.sport.toLowerCase() === this.selectedSport.toLowerCase()
      );
    }
    // Reset to first page when filter changes
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageSizeChange(event: any) {
    this.pageSize = parseInt(event.target.value);
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    this.totalItems = this.filteredGames.length;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedGames = this.filteredGames.slice(startIndex, endIndex);
  }

  capitalizeFirstLetter(string: string): string {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  navigateToGame(gameId: string) {
    this.router.navigate(['/services/single-v3', gameId]);
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  navigateToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

  async refreshGames() {
    await this.loadDiscoverGames();
  }

  // Helper method to make Math.min available in template
  getMinValue(a: number, b: number): number {
    return Math.min(a, b);
  }
}
