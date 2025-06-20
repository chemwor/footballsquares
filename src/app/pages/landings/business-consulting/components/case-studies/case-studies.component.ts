import { Component } from '@angular/core'
import { caseStudies, CaseStudiesType } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'business-consulting-case-studies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-studies.component.html',
  styles: ``,
})
export class CaseStudiesComponent {
  allTypeCaseStudies: CaseStudiesType[] = caseStudies
}
