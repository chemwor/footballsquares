import { Component } from '@angular/core'
import {
  ClientDataType,
  clientData,
  clientDataTabPane,
  ClientTabPaneType,
} from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'saas1-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent {
  clientReviewData: ClientDataType[] = clientData
  clientDataTabPane: ClientTabPaneType[] = clientDataTabPane
  activeTabIndex = 0

  setActiveTab(index: number) {
    this.activeTabIndex = index
  }
}
