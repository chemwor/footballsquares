import { Component } from '@angular/core'
import { tools, ToolsType } from '../../data'

@Component({
  selector: 'saas-v3-tools',
  standalone: true,
  imports: [],
  templateUrl: './tools.component.html',
  styles: ``,
})
export class ToolsComponent {
  toolsData: ToolsType[] = tools
}
