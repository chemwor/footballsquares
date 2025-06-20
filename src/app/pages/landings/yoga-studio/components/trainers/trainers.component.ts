import { Component } from '@angular/core'
import { trainers, TrainersType } from '../../data'

@Component({
  selector: 'yoga-studio-trainers',
  standalone: true,
  imports: [],
  templateUrl: './trainers.component.html',
  styles: ``,
})
export class TrainersComponent {
  trainersData: TrainersType[] = trainers
}
