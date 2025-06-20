import { Component, OnInit } from '@angular/core'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { FaqsType, faqsData } from '../../data'

@Component({
  selector: 'pricing-faq',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './faq.component.html',
  styles: ``,
})
export class FaqComponent {
  pricingFaqs: FaqsType[] = faqsData
}
