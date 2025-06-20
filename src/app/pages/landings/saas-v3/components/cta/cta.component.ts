import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'saas-v3-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.component.html',
  styles: ``,
})
export class CtaComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
