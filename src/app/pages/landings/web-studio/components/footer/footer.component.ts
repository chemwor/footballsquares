import { Component } from '@angular/core'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'web-studio-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
  company = ['Home', 'Services', 'Projects', 'Blog']
  support = ['Help center', 'Terms of service', 'Legal', 'Privacy policy']
}
