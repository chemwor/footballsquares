import { Component } from '@angular/core'
import { SingleDescriptionTypes, singleDescriptions } from '../../data'
import { CommonModule } from '@angular/common'
// import { descriptions, descriptionTypes } from '../../data';

@Component({
  selector: 'single1-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description.component.html',
  styles: ``,
})
export class DescriptionComponent {
  singlepageDescriptionData: SingleDescriptionTypes[] = singleDescriptions
}
