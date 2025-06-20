import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { TeamDataType, teamsData } from '../../data'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'marketing-agency-team',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './team.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeamComponent {
  allteam: TeamDataType[] = teamsData
  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#prev-feature',
      nextEl: '#next-feature',
    },
  }
}
