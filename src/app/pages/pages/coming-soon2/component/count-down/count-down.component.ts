import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import calculateTimeToEvent from '@core/services/countDown'
import { Subscription, interval, map } from 'rxjs'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'comming-soon-count-down2',
  standalone: true,
  imports: [],
  templateUrl: './count-down.component.html',
  styles: ``,
})
export class CountDownComponent implements OnInit, OnDestroy, AfterViewInit {
  private intervalSubscription!: Subscription
  countdown: { days: number; hours: number; minutes: number; seconds: number } =
    {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

  ngOnInit(): void {
    this.countdown = calculateTimeToEvent()
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.countdown = calculateTimeToEvent()
    })
  }

  ngAfterViewInit(): void {
    initAOS()
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe()
  }
}
