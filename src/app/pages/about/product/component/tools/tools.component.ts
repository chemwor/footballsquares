import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'about-product-tools',
  standalone: true,
  imports: [],
  templateUrl: './tools.component.html',
  styles: ``,
})
export class ToolsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
