import { Component } from '@angular/core'
import { HeroComponent } from './components/hero/hero.component'
import { StatisticsComponent } from './components/statistics/statistics.component'
import { TargetComponent } from './components/target/target.component'
import { SpeakersComponent } from './components/speakers/speakers.component'
import { SponsorsComponent } from './components/sponsors/sponsors.component'
import { ScheduleComponent } from './components/schedule/schedule.component'
import { TicketsComponent } from './components/tickets/tickets.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { GalleryComponent } from './components/gallery/gallery.component'
import { ContactComponent } from './components/contact/contact.component'
import { FooterComponent } from './components/footer/footer.component'
import { NavigationBarComponent } from '@components/navigation-bars'

@Component({
  selector: 'landings-conference',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    StatisticsComponent,
    TargetComponent,
    SpeakersComponent,
    SponsorsComponent,
    ScheduleComponent,
    TicketsComponent,
    TestimonialsComponent,
    GalleryComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './conference.component.html',
  styles: ``,
})
export class ConferenceComponent {}
