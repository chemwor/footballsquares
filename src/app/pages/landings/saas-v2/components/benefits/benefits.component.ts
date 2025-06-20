import { Component } from '@angular/core'
import { BenefitProductType, benefitsProduct } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'saas-v2-benefits',
  standalone: true,
  imports: [],
  templateUrl: './benefits.component.html',
  styles: ``,
})
export class BenefitsComponent {
  benefitCardData: BenefitProductType[] = benefitsProduct
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.benefitCardData = benefitsProduct.map((data) => {
      return {
        ...data,
        ...data,
        card_flip_front: {
          ...data.card_flip_front,
          sanitizedIconFront: this.sanitizer.bypassSecurityTrustHtml(
            data.card_flip_front.icon
          ),
        },
        card_flip_back: {
          ...data.card_flip_back,
          sanitizedIconBack: this.sanitizer.bypassSecurityTrustHtml(
            data.card_flip_back.icon
          ),
        },
      }
    })
  }
}
