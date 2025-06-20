import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { FeturesComponent } from './components/fetures/fetures.component'
import { ClassesComponent } from './components/classes/classes.component'
import { TrainersComponent } from './components/trainers/trainers.component'
import { ScheduleComponent } from './components/schedule/schedule.component'
import { CtaComponent } from './components/cta/cta.component'
import { PricingComponent } from './components/pricing/pricing.component'
import { InstagramComponent } from './components/instagram/instagram.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-yoga-studio',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    FeturesComponent,
    ClassesComponent,
    TrainersComponent,
    ScheduleComponent,
    CtaComponent,
    PricingComponent,
    InstagramComponent,
    FooterComponent,
  ],
  templateUrl: './yoga-studio.component.html',
  styles: ``,
})
export class YogaStudioComponent {}
