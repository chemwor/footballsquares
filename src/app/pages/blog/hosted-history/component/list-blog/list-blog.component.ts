import { Component, OnInit } from '@angular/core'
import { blogPostList, BlogPostType } from '../../../list-sidebar/data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { supabase } from '../../../../../data-sources/supabase.client'

@Component({
  selector: 'completed-games',
  standalone: true,
  imports: [NgbPaginationModule, RouterModule, CommonModule],
  templateUrl: './complete-games.component.html',
  styles: ``,
})
export class ListBlogComponent implements OnInit {
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
    // Fetch games for owner_id = user.id, only needed columns, first 20, status = 'open'
    const { data, error } = await supabase
      .from('games')
      .select('id,title,sport,team1_name,team2_name,grid_size,status,claimed_count,pending_count,created_at')
      .eq('owner_id', user.id)
      .eq('status', 'closed')
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
      id: g.id, // Add game id for routing
      image: 'assets/img/mma-1575854_1280.jpg', // filler
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
    this.loading = false;
  }
}
