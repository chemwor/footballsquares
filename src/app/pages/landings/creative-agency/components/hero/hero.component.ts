import { Component } from '@angular/core'
import { FlipCreativeType, flipCardCreative } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'creative-agency-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  flipCreativeData: FlipCreativeType[] = flipCardCreative
}
