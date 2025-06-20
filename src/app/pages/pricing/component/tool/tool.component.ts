import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'pricing-tool',
  standalone: true,
  imports: [],
  templateUrl: './tool.component.html',
  styles: ``,
})
export class ToolComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
