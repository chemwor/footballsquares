import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'

@Component({
  selector: 'saas1-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {}
