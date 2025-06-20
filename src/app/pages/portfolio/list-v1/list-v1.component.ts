import { Component } from '@angular/core'
import { FooterComponent } from './components/footer/footer.component'
import { ContentComponent } from './components/content/content.component'
import { NavigationBarComponent } from '@components/navigation-bars/navigation-bar-1/navigation-bar.component'

@Component({
  selector: 'portfolio-list-v1',
  standalone: true,
  imports: [NavigationBarComponent, ContentComponent, FooterComponent],
  templateUrl: './list-v1.component.html',
  styles: ``,
})
export class ListV1Component {}
