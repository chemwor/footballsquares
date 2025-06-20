import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'saas-v3-mobile-app',
  standalone: true,
  imports: [],
  templateUrl: './mobile-app.component.html',
  styles: ``,
})
export class MobileAppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
