import { AfterViewInit, Component, OnInit } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'saas1-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.component.html',
})
export class CtaComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
