import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { SubscriptionComponent } from '../current-games/component/subscription/subscription.component'
import { DiscoverGamesListComponent } from './component/discover-games-list/discover-games-list.component'
import { FooterComponent } from '../../landings/saas-v2/components/footer/footer.component'

@Component({
  selector: 'app-discover-games',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    SubscriptionComponent,
    DiscoverGamesListComponent,
    FooterComponent,
  ],
  templateUrl: './discover-games.component.html',
  styles: ``,
})
export class DiscoverGamesComponent {}
