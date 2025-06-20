import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { ContactDetailComponent } from './component/contact-detail/contact-detail.component'
import { MapComponent } from './component/map/map.component'
import { FooterComponent } from './component/footer/footer.component'

@Component({
  selector: 'app-contact-v3',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    ContactDetailComponent,
    MapComponent,
    FooterComponent,
  ],
  templateUrl: './contact-v3.component.html',
  styles: ``,
})
export class ContactV3Component {}
