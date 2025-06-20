import { Component, OnInit } from '@angular/core'
import { serviceGrid, ServiceGridType } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'services-v1-grid',
  standalone: true,
  imports: [],
  templateUrl: './service-grid.component.html',
  styles: ``,
})
export class ServiceGridComponent implements OnInit {
  allserviceData: ServiceGridType[] = serviceGrid

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.allserviceData.forEach((item) => {
      item.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(item.icons)
    })
  }
}
