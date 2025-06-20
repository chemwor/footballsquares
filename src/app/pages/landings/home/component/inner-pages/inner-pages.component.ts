import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'home-inner-pages',
  standalone: true,
  imports: [],
  templateUrl: './inner-pages.component.html',
  styles: ``,
})
export class InnerPagesComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
