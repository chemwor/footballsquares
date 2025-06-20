import { Component } from '@angular/core'
import { aboutData } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'creative-agency-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {
  allAboutData = aboutData
}
