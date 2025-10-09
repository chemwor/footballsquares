import { Component } from '@angular/core'
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
export class InfluencerComponent {
  constructor(public authService: AuthService) {}

  // Helper method to check if user has standard or premium access
  canAccessAdminFeatures(): boolean {
    return this.authService.hasStandardAccess();
  }

  // Helper method to get membership level for display
  getMembershipLevel(): string {
    return this.authService.getMembershipLevel();
  }
}
