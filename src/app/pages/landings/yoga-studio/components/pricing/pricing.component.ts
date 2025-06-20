import { Component, OnInit } from '@angular/core'
import {
  pricingYoga,
  PricingYogaType,
  yogaPricing,
  YogaPricingType,
} from '../../data'
import { currency } from 'src/app/states/constants'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'yoga-studio-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent implements OnInit {
  allyogaStudio: YogaPricingType[] = yogaPricing
  pricingYoga: PricingYogaType[] = pricingYoga
  selectedCurrency = currency

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.pricingYoga.forEach((item) => {
      item.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(item.icon)
    })
  }
}
