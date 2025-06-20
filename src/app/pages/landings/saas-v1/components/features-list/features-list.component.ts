import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'saas1-features-list',
  standalone: true,
  imports: [],
  templateUrl: './features-list.component.html',
})
export class FeaturesListComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }

  teamActive = [
    'Segmenting the audience is easy and simple',
    'Functional dashboard for managing your data',
    'Key performance indicators of team interactions',
  ]
}
