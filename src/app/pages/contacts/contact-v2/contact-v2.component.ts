import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { ContactV2FormComponent } from './component/contact-v2-form/contact-v2-form.component'
import { ContactDetailComponent } from './component/contact-detail/contact-detail.component'
import { FooterComponent } from './component/footer/footer.component'

@Component({
  selector: 'app-contact-v2',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    ContactV2FormComponent,
    ContactDetailComponent,
    FooterComponent,
  ],
  templateUrl: './contact-v2.component.html',
  styles: ``,
})
export class ContactV2Component {}
