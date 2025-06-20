import { Component } from '@angular/core'
import { Breadcrumb2Component } from '@components/breadcrumb/breadcrumb-2/breadcrumb-2.component'

@Component({
  selector: 'single2-hero',
  standalone: true,
  imports: [Breadcrumb2Component],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  socialLink = ['instagram', 'dribbble', 'behance']
}
