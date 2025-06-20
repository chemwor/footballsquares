import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { register } from 'swiper/element'
import { SwiperOptions } from 'swiper/types'
import { ProfessionalMissionType, professionalMissionData } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'
import { Pagination } from 'swiper/modules'

register()

@Component({
  selector: 'agency-about-mission',
  standalone: true,
  imports: [SwiperDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './mission.component.html',
  styles: ``,
})
export class MissionComponent implements OnInit {
  professionalMissionData: ProfessionalMissionType[] = professionalMissionData

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.professionalMissionData = this.professionalMissionData.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.icon),
      }
    })
  }

  SwiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '576': { slidesPerView: 2 },
      '992': { slidesPerView: 3 },
    },
  }
}
