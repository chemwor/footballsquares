import { Component } from '@angular/core'
import { blogPostList, BlogPostType } from '../../../list-sidebar/data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { supabase } from '../../../../../data-sources/supabase.client'

@Component({
  selector: 'list-blog',
  standalone: true,
  imports: [NgbPaginationModule, RouterModule],
  templateUrl: './list-blog.component.html',
  styles: ``,
})
export class ListBlogComponent {
  allListBlog: BlogPostType[] = blogPostList;
  games: any[] = [];
  loading: boolean = false;
  error: string = '';

  async ngOnInit() {
    this.loading = true;
    this.error = '';
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) {
      this.games = [];
      this.loading = false;
      this.error = 'No user found.';
      return;
    }
    // 1. Get all squares claimed by the user
    const { data: squares, error: squaresError } = await supabase
      .from('squares')
      .select('game_id')
      .eq('user_id', user.id);
    if (squaresError) {
      this.games = [];
      this.loading = false;
      this.error = 'Error fetching squares.';
      console.error('Error fetching squares:', squaresError);
      return;
    }
    // 2. Get unique game IDs
    const gameIds = Array.from(new Set((squares || []).map(s => s.game_id)));
    if (gameIds.length === 0) {
      this.games = [];
      this.loading = false;
      return;
    }
    // 3. Query games table for those IDs
    const { data, error } = await supabase
      .from('games')
      .select('id,title,sport,team1_name,team2_name,grid_size,status,claimed_count,pending_count,created_at,owner_name')
      .eq('status', 'open')
      .neq('owner_id', user.id) // NOT owned by current user
      .order('created_at', { ascending: false })
      .limit(20);
    if (error) {
      this.games = [];
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
      excerpt: `Squares for ${g.title}. Claim your spot!`,
      shares: g.claimed_count || 0,
      comments: g.pending_count || 0,
      date: g.created_at ? new Date(g.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
      category: g.sport || ''
    }));
    this.loading = false;
  }
}
