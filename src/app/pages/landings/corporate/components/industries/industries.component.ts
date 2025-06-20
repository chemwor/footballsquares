import { AfterViewInit, Component, OnInit } from '@angular/core'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { CorporateFaqsType, corporateFaqs } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'corporate-industries',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './industries.component.html',
  styles: ``,
})
export class IndustriesComponent implements AfterViewInit {
  corporateFaqData: CorporateFaqsType[] = corporateFaqs

  ngAfterViewInit(): void {
    initAOS()
  }
}
