import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'
import { currency } from 'src/app/states/constants'
import { footerLinks } from './data'

@Component({
  selector: 'catalog-footer',
  standalone: true,
  imports: [RouterModule, NgbCollapseModule, CommonModule, NgbDropdownModule],
  templateUrl: './footer.component.html',
  styles: ``,
})
export class FooterComponent {
  selectedCurrency = currency

  LinkData = footerLinks

  toggleMenu(item: any) {
    this.LinkData.forEach((i: any) => {
      if (i !== item) {
        i.isCollapsed = true
      }
    })
    item.isCollapsed = !item.isCollapsed
  }
}
