import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'saas-v2-tools',
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
