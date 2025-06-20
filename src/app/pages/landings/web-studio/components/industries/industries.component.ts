import { ChangeDetectorRef, Component } from '@angular/core'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { WebStudioFaqType, webStudioFaqs } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'web-studio-industries',
  standalone: true,
  imports: [NgbAccordionModule, CommonModule],
  templateUrl: './industries.component.html',
  styles: ``,
})
export class IndustriesComponent {
  webStudioIndustries: WebStudioFaqType[] = webStudioFaqs
  activeAccordionIndex = 0
  bindedImage = [
    'assets/img/landing/web-studio/industries/01.jpg',
    'assets/img/landing/web-studio/industries/02.jpg',
    'assets/img/landing/web-studio/industries/03.jpg',
    'assets/img/landing/web-studio/industries/04.jpg',
  ]
  constructor(private cdRef: ChangeDetectorRef) {}

  onAccordionChange(index: any) {
    this.activeAccordionIndex = index
  }
}
