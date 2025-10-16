import { Component, OnInit } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { SubscriptionComponent } from '../current-games/component/subscription/subscription.component'
import { ListBlogComponent } from './component/list-blog/list-blog.component'
import { supabase } from '../../../data-sources/supabase.client'
import { CommonModule } from '@angular/common'
import { FooterComponent } from '../../landings/saas-v2/components/footer/footer.component'

export enum GameStatus {
  Open = 'open',
  Closed = 'closed',
  Locked = 'locked',
  Started = 'started',
  Completed = 'completed',
  Canceled = 'canceled',
}

@Component({
  selector: 'hosted-games',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    SubscriptionComponent,
    FooterComponent,
    ListBlogComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './complete-games.component.html',
  styles: ``,
})
export class CompleteGamesComponent implements OnInit {
  games: any[] = []
  loading = true
  error = ''

  async ngOnInit() {
    await this.loadHistoricalGames()
  }

  async loadHistoricalGames() {
    this.loading = true
    this.error = ''

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        this.games = []
        this.loading = false
        return
      }

      console.log('Fetching historical games for user:', user.id)

      // First, let's see ALL games for this user to debug what statuses exist
      const { data: allGames, error: allGamesError } = await supabase
        .from('games')
        .select('id, title, status')
        .eq('owner_id', user.id)

      if (allGamesError) {
        console.error('Error fetching all games:', allGamesError)
      } else {
        console.log('All games for user:', allGames)
        console.log('Unique statuses found:', [
          ...new Set(allGames?.map((g) => g.status) || []),
        ])
      }

      // Fetch games where user is the owner and status is Completed, Closed, or Canceled
      const { data: gamesData, error } = await supabase
        .from('games')
        .select(
          `
          id,
          title,
          sport,
          league,
          team1_name,
          team2_name,
          team1_logo_url,
          team2_logo_url,
          grid_size,
          status,
          owner_name,
          created_at,
          starts_at,
          closed_at,
          winner_announced_at,
          claimed_count,
          pending_count
        `
        )
        .eq('owner_id', user.id)
        .in('status', [
          GameStatus.Completed,
          GameStatus.Closed,
          GameStatus.Canceled,
        ])
        .order('closed_at', { ascending: false })
        .order('created_at', { ascending: false })

      console.log('Historical games query result:', { data: gamesData, error })

      if (error) {
        console.error('Error fetching historical games:', error)
        this.error = 'Could not load your game history.'
        this.loading = false
        return
      }

      console.log('Raw games data:', gamesData)
      console.log('Looking for statuses:', [
        GameStatus.Completed,
        GameStatus.Closed,
        GameStatus.Canceled,
      ])

      // Transform the data to match the expected format
      this.games = (gamesData || []).map((game) => ({
        id: game.id,
        image: game.team1_logo_url || 'assets/img/card.png',
        title: game.title,
        sport: game.sport || 'Unknown',
        match: `${game.team1_name || 'Team 1'} vs ${game.team2_name || 'Team 2'}`,
        boardSize: `${game.grid_size}x${game.grid_size}`,
        status: this.getStatusDisplay(game.status),
        ownerName: game.owner_name || 'Unknown',
        excerpt: this.getExcerpt(game),
        shares: game.claimed_count || 0,
        comments: game.pending_count || 0,
        date: this.getDisplayDate(game),
        category: game.sport || 'Unknown',
        gameData: game,
      }))

      this.loading = false
    } catch (err) {
      console.error('Error loading historical games:', err)
      this.error = 'Unexpected error loading game history.'
      this.loading = false
    }
  }

  private getStatusDisplay(status: string): string {
    switch (status) {
      case GameStatus.Completed:
        return 'Completed'
      case GameStatus.Closed:
        return 'Closed'
      case GameStatus.Canceled:
        return 'Cancelled'
      default:
        return status
    }
  }

  private getExcerpt(game: any): string {
    switch (game.status) {
      case GameStatus.Completed:
        return `This game is finished. See results and winners! Final participation: ${game.claimed_count || 0} squares claimed.`
      case GameStatus.Closed:
        return `This game has been closed. Final participation: ${game.claimed_count || 0} squares claimed.`
      case GameStatus.Canceled:
        return `This game was cancelled by the admin. No squares were finalized.`
      default:
        return 'Historical squares game.'
    }
  }

  private getDisplayDate(game: any): string {
    // Use closed_at for completed games, created_at as fallback
    const dateToUse =
      game.closed_at || game.winner_announced_at || game.created_at
    return new Date(dateToUse).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
}
