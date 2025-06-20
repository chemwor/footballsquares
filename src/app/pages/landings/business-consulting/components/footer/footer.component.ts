import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'business-consulting-footer',
  standalone: true,
  imports: [RouterModule, LogoBoxComponent],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
  services = ['Services', 'Industries', 'Clients', 'Reviews', 'Case studies']
  contact = ['Contacts', 'Help center', 'Privacy policy']
  about = ['About', 'Careers', 'News & insights', 'Industry forecasts']
}
