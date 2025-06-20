import { Component } from '@angular/core'
import { webAwardData, WebAwardType } from '../../data'

@Component({
  selector: 'web-studio-awards',
  standalone: true,
  imports: [],
  templateUrl: './awards.component.html',
  styles: ``,
})
export class AwardsComponent {
  webAward: WebAwardType[] = webAwardData

  ngOnInit(): void {
    this.webAward = webAwardData
  }
}
