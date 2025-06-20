import { AfterViewInit, Component } from '@angular/core'
import { portfolioList2, PortfolioList2Type } from '../../data'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { RouterModule } from '@angular/router'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'list2-case-studies',
  standalone: true,
  imports: [Breadcrumb1Component, RouterModule],
  templateUrl: './case-studies.component.html',
  styles: ``,
})
export class CaseStudiesComponent implements AfterViewInit {
  portfolioList: PortfolioList2Type[] = portfolioList2

  ngAfterViewInit(): void {
    initAOS()
  }
}
