import { AfterViewInit, Component, OnInit } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'home-subscribe',
  standalone: true,
  imports: [],
  templateUrl: './subscribe.component.html',
  styles: ``,
})
export class SubscribeComponent implements AfterViewInit {
  isSending = false
  ngAfterViewInit(): void {
    initAOS()
  }

  subscribe() {
    this.isSending = true
  }
}
