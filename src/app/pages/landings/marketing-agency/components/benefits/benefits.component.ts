import { Component, OnInit } from '@angular/core'
import { benefitsData, BenefitsType } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'marketing-agency-benefits',
  standalone: true,
  imports: [],
  templateUrl: './benefits.component.html',
  styles: ``,
})
export class BenefitsComponent implements OnInit {
  benefitsData: BenefitsType[] = benefitsData

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.benefitsData = this.benefitsData.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.svgPath),
      }
    })
  }
}
