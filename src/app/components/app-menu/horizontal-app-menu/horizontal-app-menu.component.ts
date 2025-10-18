import { CommonModule } from '@angular/common'
import { Component, inject, OnInit, computed, ChangeDetectorRef, effect } from '@angular/core'
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
  private cdr = inject(ChangeDetectorRef)

  // Make authService public so template can access it
  public authService = inject(AuthService)

  buyLink = buyLink

  // Computed signals that automatically update when auth state changes
  menuItems = computed(() => {
    const user = this.authService.user()
    const profile = this.authService.profile()

    console.log('=== MENU COMPUTATION ===')
    console.log('User object:', user)
    console.log('User exists:', !!user)
    console.log('Profile object:', profile)
    console.log('Profile membership:', profile?.membership)

    // Direct signal check instead of isAuthenticated() method
    const isAuthenticated = user !== null
    console.log('Direct isAuthenticated check:', isAuthenticated)
    console.log('AuthService isAuthenticated() method:', this.authService.isAuthenticated())
    console.log('========================')

    const items = this.generateMenuItems(isAuthenticated, profile)
    return items
  })

  // Create an effect to explicitly trigger change detection when menu items change
  private menuUpdateEffect = effect(() => {
    const items = this.menuItems()
    console.log('🔄 Menu items effect triggered with items:', items.length)
    // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.cdr.markForCheck()
      this.cdr.detectChanges()
    }, 0)
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

  // Computed properties for URL matching and active items
  trimmedURL = location?.pathname?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )

  matchingMenuItem = computed(() => {
    const items = this.menuItems()
    return getMenuItemFromURL(items, this.trimmedURL)
  })

  activeMenuItems = computed(() => {
    const matching = this.matchingMenuItem()
    if (matching) {
      return findAllParent(this.menuItems(), matching)
    }
    return []
  })

  // Debug computed signals for template display
  menuItemKeys = computed(() => {
    return this.menuItems().map(item => item.key).join(', ')
  })

  userAuthStatus = computed(() => {
    return this.authService.user() ? 'YES' : 'NO'
  })

  profileMembership = computed(() => {
    return this.authService.profile()?.membership || 'None'
  })

  ngOnInit() {
    // Component is now fully reactive - no need for imperative initialization
  }

  private generateMenuItems(isAuthenticated: boolean, profile: any): MenuItemType[] {
    console.log('🔍 Generating menu items - User authenticated:', isAuthenticated)
    console.log('📋 Profile data:', profile)

    if (!isAuthenticated) {
      console.log('��� User not authenticated - showing PRE_SIGNIN_MENU_ITEMS:', PRE_SIGNIN_MENU_ITEMS)
      return [...PRE_SIGNIN_MENU_ITEMS]
    }

    // User is signed in - build dynamic menu
    console.log('✅ User authenticated - building SIGNED_IN_MENU_ITEMS')
    let menuItems = [...SIGNED_IN_MENU_ITEMS]
    console.log('📝 Base signed-in menu items:', menuItems)

    // Check if user should see Host menu
    const shouldShowHostMenu = this.shouldShowHostMenuForUser(profile)
    console.log('🏠 Should show host menu:', shouldShowHostMenu)

    if (shouldShowHostMenu) {
      // Insert Host menu after Home but before Games
      const gamesIndex = menuItems.findIndex(item => item.key === 'games')
      if (gamesIndex > -1) {
        menuItems.splice(gamesIndex, 0, ...HOST_MENU_ITEMS)
        console.log('🎯 Inserted host menu before games at index:', gamesIndex)
      } else {
        // If Games not found, add Host menu after Home
        menuItems.splice(1, 0, ...HOST_MENU_ITEMS)
        console.log('🎯 Inserted host menu after home')
      }
    }

    console.log('🎉 Final menu items:', menuItems)
    return menuItems
  }

  // Helper method to determine if user should see Host menu
  private shouldShowHostMenuForUser(profile: any): boolean {
    // Show Host menu if user is not a free member OR has squares that have been played
    const membership = profile?.membership || 'free'
    const isFreeMember = membership === 'free' || !membership

    // For now, we'll show Host menu for non-free members
    // TODO: Add logic to check if user has played squares
    return !isFreeMember
  }
}
