import { AfterViewInit, Component, OnInit } from '@angular/core'
import { currency } from 'src/app/states/constants'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'influencer-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.component.html',
  styles: ``,
})
export class CtaComponent implements AfterViewInit {
  selectedCurrency = currency
  ngAfterViewInit(): void {
    initAOS()
  }
}
