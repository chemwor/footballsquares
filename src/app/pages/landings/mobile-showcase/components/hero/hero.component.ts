import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'mobile-showcase-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
