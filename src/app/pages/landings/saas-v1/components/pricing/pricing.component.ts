import { Component, ElementRef } from '@angular/core'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'saas1-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  paymentType: string = 'monthly'
  selectedCurrency = currency
  constructor(private element: ElementRef) {}

  changePayment(type: string) {
    this.paymentType = type

    const monthlyPrice = this.element.nativeElement.querySelectorAll(
      '[data-monthly-price]'
    )
    const annualPrice = this.element.nativeElement.querySelectorAll(
      '[data-annual-price]'
    )

    if (type == 'monthly') {
      this.showPrice(monthlyPrice, annualPrice)
    } else {
      this.showPrice(annualPrice, monthlyPrice)
    }
  }

  showPrice(
    monthlyPrice: NodeListOf<Element>,
    annualPrice: NodeListOf<Element>
  ) {
    monthlyPrice.forEach((element) => {
      element.classList.remove('d-none')
    })
    annualPrice.forEach((element) => {
      element.classList.add('d-none')
    })
  }
  pricingData = [
    'In lorem eget amet sit',
    'Sodales sit velit ornare',
    'Tristique suspendisse proin',
    'Nunc nullam in dignissim',
    'Imperdiet amet suspendisse',
    'Tristique nibh erat et quis',
  ]
}
