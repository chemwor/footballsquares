import { Component } from '@angular/core'
import { currency } from 'src/app/states/constants'
import { statesData, StatesType } from '../../data'

@Component({
  selector: 'earning-states',
  standalone: true,
  imports: [],
  templateUrl: './states.component.html',
  styles: ``,
})
export class StatesComponent {
  selectedCurrency = currency
  statesData: StatesType[] = statesData
}
