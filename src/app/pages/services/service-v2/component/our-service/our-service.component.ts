import { Component, OnInit } from '@angular/core'
import { ServiceV2Type, serviceV2 } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'service-v2-our-service',
  standalone: true,
  imports: [],
  templateUrl: './our-service.component.html',
  styles: ``,
})
export class OurServiceComponent implements OnInit {
  servicev2Feature: ServiceV2Type = serviceV2
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    for (let i = 0; i < this.servicev2Feature.length; i++) {
      const group = this.servicev2Feature[i]

      for (let j = 0; j < group.length; j++) {
        const item = group[j]
        item.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(item.icon)
      }
    }
  }
}
