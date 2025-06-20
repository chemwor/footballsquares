import { Component, OnInit } from '@angular/core'
import { ServiceType, servicesData } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'about-agency-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styles: ``,
})
export class ServiceComponent implements OnInit {
  serviceData: ServiceType[] = servicesData
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.serviceData.forEach((item) => {
      item.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(item.icon)
    })
  }
}
