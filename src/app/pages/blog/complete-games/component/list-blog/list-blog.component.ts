import { Component, OnInit } from '@angular/core'
import { blogPostList, BlogPostType } from '../../../list-sidebar/data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { supabase } from '../../../../../data-sources/supabase.client'

@Component({
  selector: 'completed-games',
  standalone: true,
  imports: [NgbPaginationModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './complete-games.component.html',
  styles: ``,
})
export class ListBlogComponent implements OnInit {
  allListBlog: BlogPostType[] = blogPostList;
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

  constructor(private router: Router) {}

  async ngOnInit() {
    await this.loadSports();
    await this.loadGames();
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

  async loadGames() {
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
      this.showSignInPrompt = true;
      return;
    }

    // 1. Get all squares claimed by the user
    const { data: squares, error: squaresError } = await supabase
      .from('squares')
      .select('game_id')
      .eq('user_id', user.id);

    if (squaresError) {
      this.games = [];
      this.filteredGames = [];
      this.paginatedGames = [];
      this.loading = false;
      this.error = 'Error fetching user squares.';
      console.error('Error fetching squares:', squaresError);
      return;
    }

    // 2. Get unique game IDs where user has squares
    const gameIds = Array.from(new Set((squares || []).map(s => s.game_id)));

    if (gameIds.length === 0) {
      this.games = [];
      this.filteredGames = [];
      this.paginatedGames = [];
      this.loading = false;
      return;
    }

    // 3. Query games table for closed games where user has squares (remove limit for proper pagination)
    const { data, error } = await supabase
      .from('games')
      .select('id,title,sport,team1_name,team2_name,grid_size,status,claimed_count,pending_count,created_at,owner_name')
      .eq('status', 'closed') // Only closed games
      .in('id', gameIds) // Only games where user has squares
      .order('created_at', { ascending: false });

    if (error) {
      this.games = [];
      this.filteredGames = [];
      this.paginatedGames = [];
      this.loading = false;
      this.error = 'Error fetching games.';
      console.error('Error fetching games:', error);
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
      excerpt: `Completed game: ${g.title}. Check your results!`,
      shares: g.claimed_count || 0,
      comments: g.pending_count || 0,
      date: g.created_at ? new Date(g.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
      category: g.sport || ''
    }));

    this.filteredGames = [...this.games];
    this.updatePagination();
    this.loading = false;
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

  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  getMaxItemsShown(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  navigateToSignIn() {
    this.router.navigate(['/account/signin']);
  }
}
