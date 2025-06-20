import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'saas-v2-steps',
  standalone: true,
  imports: [],
  templateUrl: './steps.component.html',
  styles: ``,
})
export class StepsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
