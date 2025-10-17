import { CommonModule } from '@angular/common'
import { Component, inject, OnInit, effect } from '@angular/core'
import { RouterModule } from '@angular/router'
import { splitArray } from 'src/app/utils/array'
import { findAllParent, getMenuItemFromURL } from '@helpers/menu'
import { MenuItemType, PRE_SIGNIN_MENU_ITEMS, SIGNED_IN_MENU_ITEMS, HOST_MENU_ITEMS } from 'src/app/common/menu-items'
import { basePath, buyLink } from 'src/app/states/constants'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'horizontal-app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './horizontal-app-menu.component.html',
})
export class HorizontalAppMenu implements OnInit {
  private authService = inject(AuthService)
  buyLink = buyLink

  menuItems: MenuItemType[] = []
  megaMenuItems: MenuItemType[] = []
  normalMenuItems: MenuItemType[] = []
  splitMegaMenuItems: MenuItemType[][] = []
  activeMenuItems: string[] = []
  matchingMenuItem: MenuItemType | undefined

  trimmedURL = location?.pathname?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )

  ngOnInit() {
    // Use effect to watch for auth state changes and regenerate menu
    effect(() => {
      // Reading the signal value triggers reactivity
      const user = this.authService.user()

      // Generate menu based on current user state
      this.generateMenuItems(user !== null)

      // Update all derived properties
      this.updateMenuProperties()
    })
  }

  private generateMenuItems(isAuthenticated: boolean): void {
    if (!isAuthenticated) {
      this.menuItems = [...PRE_SIGNIN_MENU_ITEMS]
      return
    }

    // User is signed in - build dynamic menu
    this.menuItems = [...SIGNED_IN_MENU_ITEMS]

    // Check if user should see Host menu
    const shouldShowHostMenu = this.shouldShowHostMenuForUser()

    if (shouldShowHostMenu) {
      // Insert Host menu after Home but before Games
      const gamesIndex = this.menuItems.findIndex(item => item.key === 'games')
      if (gamesIndex > -1) {
        this.menuItems.splice(gamesIndex, 0, ...HOST_MENU_ITEMS)
      } else {
        // If Games not found, add Host menu after Home
        this.menuItems.splice(1, 0, ...HOST_MENU_ITEMS)
      }
    }
  }

  private updateMenuProperties(): void {
    // Initialize other properties based on the generated menu
    this.megaMenuItems = this.menuItems.filter((item) => item.isMega)
    this.normalMenuItems = this.menuItems.filter((item) => !item.isMega)

    if (this.megaMenuItems.length > 0 && this.megaMenuItems[0].children) {
      this.splitMegaMenuItems = splitArray(this.megaMenuItems[0].children, 10)
    }

    this.matchingMenuItem = getMenuItemFromURL(this.menuItems, this.trimmedURL)

    if (this.matchingMenuItem) {
      this.activeMenuItems = [
        ...findAllParent(this.menuItems, this.matchingMenuItem),
      ]
    }
  }

  // Helper method to determine if user should see Host menu
  private shouldShowHostMenuForUser(): boolean {
    // Show Host menu if user is not a free member OR has squares that have been played
    const isFreeMember = this.authService.hasFreeMembership()

    // For now, we'll show Host menu for non-free members
    // TODO: Add logic to check if user has played squares
    return !isFreeMember
  }
}
