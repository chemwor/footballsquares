import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { webStudioSkills, WebstudioSkillType } from '../../data'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'web-studio-skills',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './skills.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SkillsComponent {
  webSkill: WebstudioSkillType[] = webStudioSkills

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
