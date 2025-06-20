import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBarComponent } from '@components/navigation-bars'
import { PageTitleComponent } from './component/page-title/page-title.component'
import { ContactFormComponent } from './component/contact-form/contact-form.component'
import { FooterComponent } from './component/footer/footer.component'

@Component({
  selector: 'app-contact-v1',
  standalone: true,
  imports: [
    NavigationBarComponent,
    Breadcrumb1Component,
    PageTitleComponent,
    ContactFormComponent,
    FooterComponent,
  ],
  templateUrl: './contact-v1.component.html',
  styles: ``,
})
export class ContactV1Component {}
