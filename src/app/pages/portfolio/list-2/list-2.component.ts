import { Component } from '@angular/core'
import { NavigationBar6Component } from '@components/navigation-bars'
import { CaseStudiesComponent } from './components/case-studies/case-studies.component'
import { ContactComponent } from './components/contact/contact.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'app-list-2',
  standalone: true,
  imports: [
    NavigationBar6Component,
    CaseStudiesComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './list-2.component.html',
  styles: ``,
})
export class List2Component {}
