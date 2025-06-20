import { Component } from '@angular/core'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'about-agency-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  socialIcon = ['instagram', 'behance', 'medium', 'dribbble']
  author = createdBy
  developBy = developedByLink
}
