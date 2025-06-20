import { Component } from '@angular/core'

@Component({
  selector: 'single1-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewComponent {
  company = {
    name: 'Vintage',
    employees: '12-18 employees',
    location: 'Dublin, Ireland',
  }

  industry = 'E-commerce'

  services = ['Email marketing', 'Content marketing', 'Social networks']

  timeSpent = '2021, 3 months'
}
