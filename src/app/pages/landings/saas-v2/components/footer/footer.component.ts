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
  company = [
    { label: 'Features', fragment: 'features' },
    { label: 'Reviews', fragment: 'reviews' },
    { label: 'How it works', fragment: 'howitworks' },
    { label: 'Pricing', fragment: 'pricing' },
  ]

  support = ['Terms of service', 'Legal', 'Privacy policy']
}
