import { Component } from '@angular/core'
import { createdBy, currency, developedByLink } from 'src/app/states/constants'

@Component({
  selector: 'product-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  author = createdBy
  developBy = developedByLink
  selectedCurrency = currency
}
