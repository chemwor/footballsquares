import { Component, Input } from '@angular/core'

@Component({
  selector: 'saas-v3-edge',
  standalone: true,
  imports: [],
  templateUrl: './edge.component.html',
  styles: ``,
})
export class EdgeComponent {
  @Input() class: string = ''
}
