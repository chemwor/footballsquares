import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'insurance-health-services',
  standalone: true,
  imports: [],
  templateUrl: './health-services.component.html',
  styles: ``,
})
export class HealthServicesComponent implements AfterViewInit {
  services = [
    'Manage your policy online - anywhere, anytime',
    'International coverage',
    'Fast access to treatment',
    'Fast, simple claiming',
  ]
  ngAfterViewInit(): void {
    initAOS()
  }
}
