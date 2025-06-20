import { Component } from '@angular/core'
import * as Chart from 'chart.js'
import { NgChartjsModule } from 'ng-chartjs'
import { BaseChartDirective } from 'ng2-charts'
import { ChartType, lineAreaChart } from '../../data'

@Component({
  selector: 'earning-sales-value',
  standalone: true,
  imports: [BaseChartDirective, NgChartjsModule],
  templateUrl: './sales-value.component.html',
  styles: ``,
})
export class SalesValueComponent {
  lineAreaChart: ChartType = lineAreaChart
}
