import { Component, OnInit } from '@angular/core'
import { BenefitProductType, benefitsProduct } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'about-product-benefits',
  standalone: true,
  imports: [],
  templateUrl: './benefits.component.html',
  styles: ``,
})
export class BenefitsComponent implements OnInit {
  benefitCardData: BenefitProductType[] = benefitsProduct
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.benefitCardData = benefitsProduct.map((data) => {
      return {
        ...data,
        item: {
          ...data.item,
          card_flip_front: {
            ...data.item.card_flip_front,
            sanitizedIconFront: this.sanitizer.bypassSecurityTrustHtml(
              data.item.card_flip_front.icon
            ),
          },
          card_flip_back: {
            ...data.item.card_flip_back,
            sanitizedIconBack: this.sanitizer.bypassSecurityTrustHtml(
              data.item.card_flip_back.icon
            ),
          },
        },
      }
    })
  }
}
