import { Component, type AfterViewInit } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'about-product-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
})
export class FeaturesComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
