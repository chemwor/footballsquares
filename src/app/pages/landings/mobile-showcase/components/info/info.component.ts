import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'

@Component({
  selector: 'mobile-showcase-info',
  standalone: true,
  imports: [CommonModule, ParallaxMouseMoveDirective],
  templateUrl: './info.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InfoComponent {}
