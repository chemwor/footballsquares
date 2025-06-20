import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'saas-v2-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
  company = ['Features', 'Reviews', 'How it works', 'Pricing']

  support = ['Help center', 'Terms of service', 'Legal', 'Privacy policy']
}
