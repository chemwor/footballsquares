import { Component } from '@angular/core'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { CountDownComponent } from './component/count-down/count-down.component'

@Component({
  selector: 'pages-coming-soon2',
  standalone: true,
  imports: [LogoBoxComponent, CountDownComponent],
  templateUrl: './coming-soon2.component.html',
  styles: ``,
})
export class ComingSoon2Component {}
