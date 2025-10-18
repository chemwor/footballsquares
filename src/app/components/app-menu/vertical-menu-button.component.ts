import { Component, inject, type OnInit, computed } from '@angular/core'
import { VerticalAppMenuComponent } from './vertical-app-menu/vertical-app-menu.component'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { AuthService } from '../../services/auth.service'
import { MenuItemType, PRE_SIGNIN_MENU_ITEMS, SIGNED_IN_MENU_ITEMS, HOST_MENU_ITEMS } from 'src/app/common/menu-items'

@Component({
  selector: 'vertical-menu-button',
  standalone: true,
  imports: [VerticalAppMenuComponent, LogoBoxComponent],
  template: `
    <ng-template #offcanvasContent let-offcanvas>
      <div class="offcanvas-header border-bottom">
        <component-logo-box />
        <button
          (click)="offcanvas.dismiss()"
          class="btn-close"
          type="button"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body">
        <vertical-app-menu
          [menuItems]="menuItems()"
          [offcanvasRef]="offcanvas"
        ></vertical-app-menu>
      </div>
    </ng-template>

    <button
      class="navbar-toggler ms-sm-3"
      [attr.aria-expanded]="isOffcanvasOpen"
      (click)="offcanvasService.open(offcanvasContent)"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
  `,
})
export class VerticalMenuButtonComponent implements OnInit {
  private authService = inject(AuthService)
  offcanvasService = inject(NgbOffcanvas)
  isOffcanvasOpen = false

  // Computed signal for reactive menu items based on authentication
  menuItems = computed(() => {
    const user = this.authService.user()
    const profile = this.authService.profile()

    return this.generateMenuItems(user !== null, profile)
  })

  ngOnInit(): void {
    // Component is now fully reactive
  }

  private generateMenuItems(isAuthenticated: boolean, profile: any): MenuItemType[] {
    if (!isAuthenticated) {
      return [...PRE_SIGNIN_MENU_ITEMS]
    }

    // User is signed in - build dynamic menu
    let menuItems = [...SIGNED_IN_MENU_ITEMS]

    // Check if user should see Host menu
    const shouldShowHostMenu = this.shouldShowHostMenuForUser(profile)

    if (shouldShowHostMenu) {
      // Insert Host menu after Home but before Games
      const gamesIndex = menuItems.findIndex(item => item.key === 'games')
      if (gamesIndex > -1) {
        menuItems.splice(gamesIndex, 0, ...HOST_MENU_ITEMS)
      } else {
        // If Games not found, add Host menu after Home
        menuItems.splice(1, 0, ...HOST_MENU_ITEMS)
      }
    }

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
