import { Component } from '@angular/core'
import { parallaxLayers, ParallaxType } from '../../data'
import { CommonModule } from '@angular/common'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'

@Component({
  selector: 'saas-v4-use-case',
  standalone: true,
  imports: [CommonModule, ParallaxMouseMoveDirective],
  templateUrl: './use-case.component.html',
  styles: ``,
})
export class UseCaseComponent {
  parallaxLayers: ParallaxType[] = parallaxLayers
}
