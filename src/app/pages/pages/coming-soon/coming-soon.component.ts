import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { CountDownComponent } from './component/count-down/count-down.component'
import Aos from 'aos'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'pages-coming-soon',
  standalone: true,
  imports: [LogoBoxComponent, CountDownComponent, ParallaxMouseMoveDirective],
  templateUrl: './coming-soon.component.html',
  styles: `
    .B {
      stroke-miterlimit: 10;
    }

    .C {
      fill: currentColor;
    }

    .D {
      stroke: #fff;
    }

    .E {
      stroke-width: 1.709;
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComingSoonComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
