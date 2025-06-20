import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'insurance-footer',
  standalone: true,
  imports: [RouterModule, LogoBoxComponent],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
  about = ['About us', 'Our team', 'Customer reviews', 'Latest news']
  insurance = ['Health insurance', 'Car insurance', 'Travel insurance']
  terms = ['insurance', 'Licensing', 'Privacy policy']
  licensing = ['Licensing', 'Privacy policy', 'Terms of use']
}
