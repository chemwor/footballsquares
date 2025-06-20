import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'saas1-footer',
  standalone: true,
  imports: [RouterModule, LogoBoxComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
  company = ['Features', 'Reviews', 'How it works', 'Pricing']
  support = ['Help center', 'Terms of service', 'Legal', 'Privacy policy']
}
