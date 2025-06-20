import { Component, OnInit } from '@angular/core'
import { insuranceCategory, InsuranceCategoryType } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'insurance-benefits',
  standalone: true,
  imports: [],
  templateUrl: './benefits.component.html',
  styles: ``,
})
export class BenefitsComponent implements OnInit {
  insuranceCategory: InsuranceCategoryType[] = insuranceCategory
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.insuranceCategory = this.insuranceCategory.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.icon),
      }
    })
  }
}
