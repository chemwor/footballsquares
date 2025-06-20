import { Component } from '@angular/core'
import { countriesData, CountryType } from '../../data'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'earning-country-sales',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './country-sales.component.html',
  styles: ``,
})
export class CountrySalesComponent {
  country: CountryType[] = countriesData
  selectedCurrency = currency
}
