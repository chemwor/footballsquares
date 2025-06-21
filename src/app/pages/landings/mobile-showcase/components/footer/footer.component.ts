import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { buyLink, createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'mobile-showcase-footer',
  standalone: true,
  imports: [RouterModule, LogoBoxComponent],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
  protected readonly buyLink = buyLink
}
