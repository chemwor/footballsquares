import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { splitArray } from 'src/app/utils/array'
import { findAllParent, getMenuItemFromURL, getMenuItems } from '@helpers/menu'
import { MenuItemType } from 'src/app/common/menu-items'
import { basePath, buyLink } from 'src/app/states/constants'

@Component({
  selector: 'horizontal-app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './horizontal-app-menu.component.html',
})
export class HorizontalAppMenu {
  menuItems = getMenuItems()
  buyLink = buyLink

  megaMenuItems = this.menuItems.filter((item) => item.isMega)
  normalMenuItems = this.menuItems.filter((item) => !item.isMega)
  splitMegaMenuItems: MenuItemType[][] = splitArray(
    this.megaMenuItems[0].children ?? [],
    10
  )

  trimmedURL = location?.pathname?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )
  matchingMenuItem = getMenuItemFromURL(this.menuItems, this.trimmedURL)

  activeMenuItems: string[] = []

  ngOnInit() {
    if (this.matchingMenuItem) {
      this.activeMenuItems = [
        ...findAllParent(this.menuItems, this.matchingMenuItem),
      ]
    }
  }
}
