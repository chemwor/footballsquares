import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'insurance-car-services',
  standalone: true,
  imports: [],
  templateUrl: './car-services.component.html',
  styles: ``,
})
export class CarServicesComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
