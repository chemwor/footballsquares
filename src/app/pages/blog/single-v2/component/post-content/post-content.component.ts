import { Component } from '@angular/core'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'single-2-post-content',
  standalone: true,
  imports: [NgbTooltipModule],
  templateUrl: './post-content.component.html',
  styles: ``,
})
export class PostContentComponent {
  socialICon = ['instagram', 'facebook', 'telegram', 'x']
  list = [
    'Quam laoreet eget id sapien',
    'Morbi convallis suspendisse',
    'Vivamus non ante',
    'Praesent dignissim efficitur',
    'Gravida a mi neque',
  ]
  tag = ['Nature', 'Books', 'travel']
}
