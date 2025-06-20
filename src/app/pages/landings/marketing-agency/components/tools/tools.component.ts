import { AfterViewInit, Component } from '@angular/core'
import { toolsData, ToolsType } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'marketing-agency-tools',
  standalone: true,
  imports: [],
  templateUrl: './tools.component.html',
  styles: ``,
})
export class ToolsComponent implements AfterViewInit {
  toolList: ToolsType[] = toolsData

  ngAfterViewInit(): void {
    initAOS()
  }
}
