import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { FreeMode, Mousewheel } from 'swiper/modules'
import { RouterModule } from '@angular/router'

register()
@Component({
  selector: 'portfolio-slider',
  standalone: true,
  imports: [NavigationBar2Component, SwiperDirective, RouterModule],
  templateUrl: './slider.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  swiperConfig: SwiperOptions = {
    modules: [Mousewheel],
    direction: 'vertical',
    mousewheel: {
      thresholdDelta: 20,
      releaseOnEdges: true,
    },
  }
}
