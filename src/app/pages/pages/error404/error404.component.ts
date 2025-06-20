import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { LottieComponent, AnimationOptions } from 'ngx-lottie'
import { basePath } from 'src/app/states/constants'

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [LottieComponent, RouterModule],
  templateUrl: './error404.component.html',
  styles: ``,
})
export class Error404Component {
  options: AnimationOptions = {
    path: `${basePath}/assets/json/animation-404-light.json`,
  }
  option: AnimationOptions = {
    path: `${basePath}/assets/json/animation-404-dark.json`,
  }
}
