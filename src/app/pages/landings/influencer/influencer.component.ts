import { Component, OnInit } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { AboutComponent } from './components/about/about.component'
import { FeaturesComponent } from './components/features/features.component'
import { CurrentUserGamesComponent} from './components/guides/guides.component'
import { ResultsComponent } from './components/results/results.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { SubscriptionComponent } from './components/subscription/subscription.component'
import { InstagramComponent } from './components/instagram/instagram.component'
import {PendingRequestsComponent } from '../../../components/pending-requests/pending-requests.component'
import { PendingApprovalsComponent } from './components/admin-list-squares/guides.component'
import { AdminActiveGamesComponent } from './components/admin-active-games/guides.component'
import { CtaComponent } from '../saas-v3/components/cta/cta.component'
import { FooterComponent } from '../saas-v2/components/footer/footer.component'
import { AuthService } from '../../../services/auth.service'
import { BoardService } from '../../../services/board.service'
import { supabase } from '../../../data-sources/supabase.client'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'landings-influencer',
  standalone: true,
  imports: [
    CommonModule,
    NavigationBar2Component,
    HeroComponent,
    PendingRequestsComponent,
    PendingApprovalsComponent,
    AdminActiveGamesComponent,
    CurrentUserGamesComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './influencer.component.html',
  styles: ``,
})
export class InfluencerComponent implements OnInit {
  gameData: any = null;

  constructor(
    public authService: AuthService,
    private boardService: BoardService
  ) {}

  async ngOnInit() {
    // Load current game data for the pending requests component
    await this.loadCurrentGame();
  }

  async loadCurrentGame() {
    try {
      // Get the current/active game - looking for games that are open, locked, or started
      const { data: games, error } = await supabase
        .from('games')
        .select('*')
        .in('status', ['open', 'locked', 'started'])
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      console.log('Loaded games for dashboard:', games);

      // For now, take the first active game - you might want more sophisticated logic here
      if (games && games.length > 0) {
        this.gameData = games[0];
        console.log('Selected game data:', this.gameData);
        console.log('Game hide_axes:', this.gameData.hide_axes);
        console.log('Game status:', this.gameData.status);
      } else {
        console.log('No active games found. Checking for any games...');

        // Fallback: get any recent game for testing
        const { data: allGames, error: allError } = await supabase
          .from('games')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1);

        if (!allError && allGames && allGames.length > 0) {
          this.gameData = allGames[0];
          console.log('Using fallback game data:', this.gameData);
        }
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  }

  // Helper method to check if user has standard or premium access
  canAccessAdminFeatures(): boolean {
    return this.authService.hasStandardAccess();
  }

  // Helper method to get membership level for display
  getMembershipLevel(): string {
    return this.authService.getMembershipLevel();
  }

  // Helper method to check if user has free membership
  hasFreeMembership(): boolean {
    return this.authService.hasFreeMembership();
  }
}
