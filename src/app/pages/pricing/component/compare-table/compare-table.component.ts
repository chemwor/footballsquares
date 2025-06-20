import { Component } from '@angular/core'
import {
  type ComparePlanType,
  planData,
  PricingPlanType,
  pricingPlan,
} from '../../data'
import { CommonModule } from '@angular/common'
import {
  NgbCollapseModule,
  NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'pricing-compare-table',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, NgbPopoverModule],
  templateUrl: './compare-table.component.html',
  styles: ``,
})
export class CompareTableComponent {
  compareDataTable: ComparePlanType[] = planData
  pricingPlanData: PricingPlanType[] = pricingPlan
  isCollapsed = false
  selectdCurrency = currency
}
