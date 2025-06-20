import { AfterViewInit, Component, OnInit } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'about-product-steps',
  standalone: true,
  imports: [],
  templateUrl: './steps.component.html',
  styles: ``,
})
export class StepsComponent implements AfterViewInit {
  step = [
    'Forecasting and recommendations',
    'Identification of patterns, analysis',
    'Segmentation by various methods',
  ]

  ngAfterViewInit(): void {
    initAOS()
  }
}
