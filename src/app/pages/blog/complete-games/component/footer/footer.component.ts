import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { createdBy, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'list-footer',
  standalone: true,
  imports: [RouterModule, LogoBoxComponent],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink

  features = ['Relevant blogs', 'Top author', 'Latest news']
  category = [
    'Business',
    'Marketing',
    'Design',
    'Psychology',
    'Books',
    'Inspiration',
  ]
  benefits = ['Analytics', 'Ecommerce', 'Brand strategy', 'Travels']
}
