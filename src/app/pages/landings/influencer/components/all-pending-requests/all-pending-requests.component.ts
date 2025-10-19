import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../../../data-sources/supabase.client';
import { NavigationBar2Component } from 'src/app/components/navigation-bars/navigation-bar-2/navigation-bar-2.component';

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
  selector: 'all-pending-requests',
  standalone: true,
  imports: [CommonModule, NavigationBar2Component],
  templateUrl: './all-pending-requests.component.html',
  styleUrls: ['./all-pending-requests.component.scss']
})
export class AllPendingRequestsComponent implements OnInit {
  pendingSquares: PendingSquare[] = [];
  loading = true;
  error: string | null = null;
  processingSquareId: string | null = null;

  async ngOnInit() {
    try {
      // Fetch all games the user is running (implement your own logic if needed)
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('id, title, status, starts_at, team1_name, team2_name')
        .eq('status', 'open')
        .order('starts_at', { ascending: true });
      if (gamesError) throw gamesError;
      if (!games || games.length === 0) {
        this.pendingSquares = [];
        return;
      }
      const gameIds = games.map(g => g.id);
      const { data: pendingSquares, error: squaresError } = await supabase
        .from('squares')
        .select('id, row_idx, col_idx, name, email, requested_at, game_id')
        .in('game_id', gameIds)
        .eq('status', 'pending')
        .order('requested_at', { ascending: false });
      if (squaresError) throw squaresError;
      this.pendingSquares = pendingSquares?.map(square => {
        const game = games.find(g => g.id === square.game_id);
        return {
          ...square,
          game_title: game?.title || 'Unknown Game',
          team1_name: game?.team1_name || '',
          team2_name: game?.team2_name || ''
        };
      }) || [];
    } catch (err: any) {
      this.error = err.message || 'Failed to load pending requests';
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
        alert('Failed to approve square. Please try again.');
        return;
      }
      await this.ngOnInit(); // Refresh the list
    } catch (err) {
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
        alert('Failed to decline square. Please try again.');
        return;
      }
      await this.ngOnInit(); // Refresh the list
    } catch (err) {
      alert('An unexpected error occurred. Please try again.');
    } finally {
      this.processingSquareId = null;
    }
  }
}
