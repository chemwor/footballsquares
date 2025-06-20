import { Component } from '@angular/core'
import { instagramYoga, InstagramYogaType } from '../../data'

@Component({
  selector: 'yoga-studio-instagram',
  standalone: true,
  imports: [],
  templateUrl: './instagram.component.html',
  styles: ``,
})
export class InstagramComponent {
  allInstagramUpload: InstagramYogaType[] = instagramYoga
}
