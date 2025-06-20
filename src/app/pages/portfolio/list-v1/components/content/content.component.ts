import { AfterViewInit, Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { portfolioList, PortfolioType } from '../../data'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'list1-content',
  standalone: true,
  imports: [Breadcrumb1Component, CommonModule, RouterModule],
  templateUrl: './content.component.html',
  styles: ``,
})
export class ContentComponent implements AfterViewInit {
  allPortfolioList: PortfolioType[] = portfolioList
  ngAfterViewInit(): void {
    initAOS()
  }
}
