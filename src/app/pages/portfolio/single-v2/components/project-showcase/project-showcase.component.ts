import { AfterViewInit, Component } from '@angular/core'
import {
  Single2CounterType,
  Single2DescriptionTypes,
  single2counter,
  singleDescriptions,
  singlev2Result,
} from '../../data'
import { CommonModule } from '@angular/common'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'single2-project-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-showcase.component.html',
  styles: ``,
})
export class ProjectShowcaseComponent implements AfterViewInit {
  projectShowCase: Single2DescriptionTypes[] = singleDescriptions
  portfolioCounter: Single2CounterType[] = single2counter
  resultCounter: Single2CounterType[] = singlev2Result
  company = {
    name: 'Vintage',
    employees: '12-18 employees',
    location: 'Dublin, Ireland',
    website: 'Visit website',
  }
  industry = 'E-commerce'

  services = ['Email marketing', 'Content marketing', 'Social networks']

  timeSpent = '2021, 3 months'

  ngAfterViewInit(): void {
    initAOS()
  }
}
