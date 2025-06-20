import { Component } from '@angular/core'
import {
  ClientDataType,
  clientData,
  clientDataTabPane,
  ClientTabPaneType,
} from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'pricing-testimonial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial.component.html',
  styles: ``,
})
export class TestimonialComponent {
  clientReviewData: ClientDataType[] = clientData
  clientDataTabPane: ClientTabPaneType[] = clientDataTabPane
  activeTabIndex = 0

  setActiveTab(index: number) {
    this.activeTabIndex = index
  }
}
