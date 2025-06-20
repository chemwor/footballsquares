import { Component, OnInit } from '@angular/core'
import { gridService, GridServiceType } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'business-consulting-grid-service',
  standalone: true,
  imports: [],
  templateUrl: './grid-service.component.html',
  styles: ``,
})
export class GridServiceComponent implements OnInit {
  allGridService: GridServiceType[] = gridService

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.allGridService = this.allGridService.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.icon),
      }
    })
  }
}
