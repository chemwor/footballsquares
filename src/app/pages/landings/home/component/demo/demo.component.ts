import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AnimationOptions, LottieComponent } from 'ngx-lottie'
import { landingDemo, LandingType } from '../../data'
import { basePath } from 'src/app/states/constants'

@Component({
  selector: 'home-demo',
  standalone: true,
  imports: [RouterModule, LottieComponent],
  templateUrl: './demo.component.html',
  styles: ``,
})
export class DemoComponent {
  landingDemo: LandingType[] = landingDemo

  options: AnimationOptions = {
    path: `${basePath}/assets/json/animation-sandwatch-light.json`,
  }

  darkOption: AnimationOptions = {
    path: `${basePath}/assets/json/animation-sandwatch-dark.json`,
  }
}
