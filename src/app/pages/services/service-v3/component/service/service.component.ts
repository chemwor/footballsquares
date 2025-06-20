import { Component } from '@angular/core'
import { AllServiceType, allServiceIncluded } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'service-v3-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styles: ``,
})
export class ServiceComponent {
  allService: AllServiceType[] = allServiceIncluded
}
