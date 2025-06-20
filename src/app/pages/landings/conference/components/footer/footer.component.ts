import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'conference-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
}
