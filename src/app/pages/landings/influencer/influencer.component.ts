import { Component } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { AboutComponent } from './components/about/about.component'
import { FeaturesComponent } from './components/features/features.component'
import { GuidesComponent } from './components/guides/guides.component'
import { ResultsComponent } from './components/results/results.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { SubscriptionComponent } from './components/subscription/subscription.component'
import { CtaComponent } from './components/cta/cta.component'
import { InstagramComponent } from './components/instagram/instagram.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-influencer',
  standalone: true,
  imports: [
    NavigationBar2Component,
    HeroComponent,
    AboutComponent,
    FeaturesComponent,
    GuidesComponent,
    ResultsComponent,
    TestimonialsComponent,
    SubscriptionComponent,
    CtaComponent,
    InstagramComponent,
    FooterComponent,
  ],
  templateUrl: './influencer.component.html',
  styles: ``,
})
export class InfluencerComponent {}
