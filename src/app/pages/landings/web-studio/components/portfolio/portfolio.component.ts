import { AfterViewInit, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'web-studio-portfolio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './portfolio.component.html',
  styles: ``,
})
export class PortfolioComponent implements AfterViewInit {
  portfolioPost = [
    'Faucibus sit est dui id gravida',
    'Lectus in sem eu facilisis ornare',
    'Massa maecenas cras vivamus',
  ]

  ngAfterViewInit(): void {
    initAOS()
  }
}
