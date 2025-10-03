import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { register } from 'swiper/element'
import { Navigation } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'
import { WebstudioSkillType, webStudioSkills } from '../../data'

register()
@Component({
  selector: 'service-v3-skills',
  standalone: true,
  imports: [SwiperDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './skills.component.html',
  styles: ``,
})
export class SkillsComponent {
  webStudioSkills: WebstudioSkillType[] = webStudioSkills

  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#prev-skill',
      nextEl: '#next-skill',
    },
  }
}
