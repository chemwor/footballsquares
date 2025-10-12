import { Component, OnInit } from '@angular/core'
import { blogPostList, BlogPostType } from '../../../list-sidebar/data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { supabase } from 'src/app/data-sources/supabase.client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

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

    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) {
      this.games = [];
      this.filteredGames = [];
      this.paginatedGames = [];
      this.loading = false;
      this.error = 'No user found.';
      return;
    }

    // Fetch ALL games for owner_id = user.id, status = 'open' (remove limit for proper pagination)
    const { data, error } = await supabase
      .from('games')
      .select('id,title,sport,team1_name,team2_name,grid_size,status,claimed_count,pending_count,created_at')
      .eq('owner_id', user.id)
      .eq('status', 'open')
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
      ownerName: user.email || '',
      excerpt: `Squares for ${g.title}. Claim your spot!`,
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
}
