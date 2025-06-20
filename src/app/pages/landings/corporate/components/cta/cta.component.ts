import { AfterViewInit, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'corporate-cta',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cta.component.html',
  styles: ``,
})
export class CtaComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
