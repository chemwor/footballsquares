import { AfterViewInit, Component } from '@angular/core'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { basePath } from 'src/app/states/constants'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'product-hero',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }

  options: AnimationOptions = {
    path: `${basePath}/assets/json/animation-soundwave.json`,
  }
}
