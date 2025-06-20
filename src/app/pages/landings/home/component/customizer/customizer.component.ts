import { AfterViewInit, Component } from '@angular/core'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'home-customizer',
  standalone: true,
  imports: [],
  templateUrl: './customizer.component.html',
  styles: ``,
})
export class CustomizerComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
