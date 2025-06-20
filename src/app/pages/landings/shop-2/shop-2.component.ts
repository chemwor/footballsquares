import { Component } from '@angular/core'
import { NavigationBar4Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { ArrivalComponent } from './components/arrival/arrival.component'
import { AboutComponent } from './components/about/about.component'
import { AwardsComponent } from './components/awards/awards.component'
import { CustomCtaComponent } from './components/custom-cta/custom-cta.component'
import { BenefitsComponent } from './components/benefits/benefits.component'
import { PopularComponent } from './components/popular/popular.component'
import { InstagramComponent } from './components/instagram/instagram.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-shop2',
  standalone: true,
  imports: [
    NavigationBar4Component,
    HeroComponent,
    ArrivalComponent,
    AboutComponent,
    AwardsComponent,
    CustomCtaComponent,
    BenefitsComponent,
    PopularComponent,
    InstagramComponent,
    FooterComponent,
  ],
  templateUrl: './shop-2.component.html',
  styles: ``,
})
export class Shop2Component {}
