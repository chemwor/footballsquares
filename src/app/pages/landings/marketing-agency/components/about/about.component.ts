import { AfterViewInit, Component } from '@angular/core'
import { SpecialistType, specialistsData } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'marketing-agency-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent implements AfterViewInit {
  aboutData: SpecialistType[] = specialistsData

  ngAfterViewInit(): void {
    initAOS()
  }
}
