import { Component, OnInit } from '@angular/core'
import { Saas3FeatureType, saas3feature } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'saas-v3-fetures',
  standalone: true,
  imports: [],
  templateUrl: './fetures.component.html',
  styles: ``,
})
export class FeturesComponent implements OnInit {
  featuresData: Saas3FeatureType[] = saas3feature

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.featuresData.forEach((item) => {
      item.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(item.svg)
    })
  }
}
