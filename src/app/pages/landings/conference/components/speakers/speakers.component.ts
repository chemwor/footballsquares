import { Component } from '@angular/core'
import { SpeakerType, speakersData } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'conference-speakers',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './speakers.component.html',
  styles: ``,
})
export class SpeakersComponent {
  speakerData: SpeakerType[] = speakersData
}
