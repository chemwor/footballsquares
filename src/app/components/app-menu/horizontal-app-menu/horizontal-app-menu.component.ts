import { CommonModule } from '@angular/common'
import { Component, inject, OnInit, computed } from '@angular/core'
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

  // Computed signals that automatically update when auth state changes
  menuItems = computed(() => {
    const user = this.authService.user()
    const profile = this.authService.profile()

    console.log('Computing menu items - User:', user ? 'authenticated' : 'not authenticated')
    console.log('Profile:', profile)

    return this.generateMenuItems(user !== null, profile)
  })

  megaMenuItems = computed(() => {
    const items = this.menuItems()
    return items.filter((item) => item.isMega)
  })

  normalMenuItems = computed(() => {
    const items = this.menuItems()
    return items.filter((item) => !item.isMega)
  })

  splitMegaMenuItems = computed(() => {
    const megaItems = this.megaMenuItems()
    if (megaItems.length > 0 && megaItems[0].children) {
      return splitArray(megaItems[0].children, 10)
    }
    return []
  })

  activeMenuItems = computed(() => {
    const items = this.menuItems()
    const matchingMenuItem = getMenuItemFromURL(items, this.trimmedURL)

    if (matchingMenuItem) {
      return [...findAllParent(items, matchingMenuItem)]
    }
    return []
  })

  matchingMenuItem = computed(() => {
    const items = this.menuItems()
    return getMenuItemFromURL(items, this.trimmedURL)
  })

  trimmedURL = location?.pathname?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )

  ngOnInit() {
    // All setup is now handled by computed signals
    console.log('HorizontalAppMenu initialized')
  }

  private generateMenuItems(isAuthenticated: boolean, profile: any): MenuItemType[] {
    console.log('Generating menu items - isAuthenticated:', isAuthenticated)

    if (!isAuthenticated) {
      const items = [...PRE_SIGNIN_MENU_ITEMS]
      console.log('Using PRE_SIGNIN_MENU_ITEMS:', items)
      return items
    }

    // User is signed in - build dynamic menu
    let items = [...SIGNED_IN_MENU_ITEMS]
    console.log('Base signed-in menu items:', items)

    // Check if user should see Host menu
    const shouldShowHostMenu = this.shouldShowHostMenuForUser(profile)
    console.log('Should show host menu:', shouldShowHostMenu)

    if (shouldShowHostMenu) {
      // Insert Host menu after Home but before Games
      const gamesIndex = items.findIndex(item => item.key === 'games')
      if (gamesIndex > -1) {
        items.splice(gamesIndex, 0, ...HOST_MENU_ITEMS)
      } else {
        // If Games not found, add Host menu after Home
        items.splice(1, 0, ...HOST_MENU_ITEMS)
      }
      console.log('Final menu items with host menu:', items)
    }

    return items
  }

  // Helper method to determine if user should see Host menu
  private shouldShowHostMenuForUser(profile: any): boolean {
    // Show Host menu if user is not a free member OR has squares that have been played
    const membership = profile?.membership
    const isFreeMember = membership === 'free' || !membership

    console.log('Profile membership:', membership, 'isFreeMember:', isFreeMember)

    // For now, we'll show Host menu for non-free members
    // TODO: Add logic to check if user has played squares
    return !isFreeMember
  }
}
