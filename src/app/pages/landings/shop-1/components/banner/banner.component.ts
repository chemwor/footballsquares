import { Component, OnDestroy, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import calculateTimeToEvent from '@core/services/countDown'
import { Subscription, interval } from 'rxjs'

@Component({
  selector: 'shop-1-banner',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent implements OnInit, OnDestroy {
  countdown: { days: number; hours: number; minutes: number; seconds: number } =
    {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  private intervalSubscription!: Subscription

  ngOnInit() {
    this.countdown = calculateTimeToEvent()
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.countdown = calculateTimeToEvent()
    })
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe()
  }
}
