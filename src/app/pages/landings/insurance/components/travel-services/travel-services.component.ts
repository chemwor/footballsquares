import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'insurance-travel-services',
  standalone: true,
  imports: [],
  templateUrl: './travel-services.component.html',
  styles: ``,
})
export class TravelServicesComponent implements AfterViewInit {
  travelService = [
    'Comprehensive protection',
    'Tailored plans',
    'Emergency medical assistance',
  ]
  ngAfterViewInit(): void {
    initAOS()
  }
}
