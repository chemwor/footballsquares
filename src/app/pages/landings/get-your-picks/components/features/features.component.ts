import { AfterViewInit, Component, OnInit } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'coworking-space-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styles: ``,
})
export class FeaturesComponent implements AfterViewInit {
  features = [
    'Faucibus vel quisque lectus laoreet sem',
    'Egestas in porta netus semper at nunc',
    'Sed amet est at faucibus dolor seds',
  ]

  ngAfterViewInit(): void {
    initAOS()
  }
}
