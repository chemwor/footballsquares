import { Component } from '@angular/core'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'conference-tickets',
  standalone: true,
  imports: [],
  templateUrl: './tickets.component.html',
  styles: ``,
})
export class TicketsComponent {
  selectedCurrency = currency
  content = [
    'Non egestas pretium iaculis venenatis ipsum cras enim et amet.',
    'Et purus quis laoreet ipsum',
    'Suspendisse turpis vehicula id ornare ut ut sollicitudin tempus vel.',
    'Justo, quam tortor leo sed varius arcu sit rhoncus.',
    'Sed maecenas sit vestibulum id ornare habitasse sit scelerisque.',
  ]
  stream = [
    'Integer lacinia quisque etiam quis morbi aliquam commodo.',
    'Neque, ullamcorper elit sit natoque.',
    'Sed orci, lacus, nunc vestibulum mi vel etiam pulvinar erat.',
  ]
}
