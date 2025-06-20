import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'about-product-cta',
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
