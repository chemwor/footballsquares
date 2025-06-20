import { Component } from '@angular/core'
import { ServicesType, marketingAgecy } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'marketing-agency-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styles: ``,
})
export class ServicesComponent {
  marketingAgecyData: ServicesType = marketingAgecy

  agencyServiceist = [
    'Individual approach to the brand',
    'We guarantee the result after a month',
    'Completing tasks exactly on time',
  ]
}
