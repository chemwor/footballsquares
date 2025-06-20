import { Component, OnInit } from '@angular/core'
import { serviceData, ServiceType } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'corporate-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styles: ``,
})
export class ServiceComponent implements OnInit {
  corporateService: ServiceType[] = serviceData
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.corporateService = this.corporateService.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.icons),
      }
    })
  }
}
