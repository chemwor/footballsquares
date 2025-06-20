import { Component } from '@angular/core'
import { aboutCoworking, AboutCoworkingType } from '../../data'

@Component({
  selector: 'coworking-space-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {
  allCoworkingAbout: AboutCoworkingType[] = aboutCoworking
}
