import { Component } from '@angular/core'
import { NgChartjsModule } from 'ng-chartjs'
import { BaseChartDirective } from 'ng2-charts'
import { ChartType, pieChart } from '../../data'

@Component({
  selector: 'earning-purchase-chart',
  standalone: true,
  imports: [BaseChartDirective, NgChartjsModule],
  templateUrl: './purchase-chart.component.html',
  styles: ``,
})
export class PurchaseChartComponent {
  PieChart!: ChartType

  ngOnInit(): void {
    this.PieChart = pieChart
  }
}
