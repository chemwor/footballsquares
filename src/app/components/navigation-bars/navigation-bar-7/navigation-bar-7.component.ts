import { Component, ElementRef, HostListener } from '@angular/core'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { HorizontalAppMenu } from '@components/app-menu/horizontal-app-menu/horizontal-app-menu.component'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { VerticalMenuButtonComponent } from '@components/app-menu/vertical-menu-button.component'
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'component-navigation-bar-7',
  standalone: true,
  imports: [
    LogoBoxComponent,
    HorizontalAppMenu,
    NgbCollapseModule,
    VerticalMenuButtonComponent,
    ThemeSwitcherComponent,
    RouterModule,
  ],
  templateUrl: './navigation-bar-7.component.html',
  styles: ``,
})
export class NavigationBar7Component {
  constructor(private elementRef: ElementRef) {}
  isMenuCollapsed = true
  // Window Scroll Event
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll()
  }

  checkScroll() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    if (scrollTop > 20) {
      this.elementRef.nativeElement
        .querySelector('.navbar')
        ?.classList.add('navbar-stuck')
    } else {
      this.elementRef.nativeElement
        .querySelector('.navbar')
        ?.classList.remove('navbar-stuck')
    }
  }
}
