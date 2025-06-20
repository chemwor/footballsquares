import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core'
import { HorizontalAppMenu } from '@components/app-menu/horizontal-app-menu/horizontal-app-menu.component'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { VerticalMenuButtonComponent } from '@components/app-menu/vertical-menu-button.component'
import { buyLink } from 'src/app/states/constants'

@Component({
  selector: 'component-navigation-bar-2',
  standalone: true,
  imports: [
    HorizontalAppMenu,
    LogoBoxComponent,
    ThemeSwitcherComponent,
    NgbCollapseModule,
    VerticalMenuButtonComponent,
  ],
  templateUrl: './navigation-bar-2.component.html',
  styles: ``,
})
export class NavigationBar2Component implements OnInit {
  @Input() mode?: 'light' | 'dark'
  isMenuCollapsed = true
  private render = inject(Renderer2)

  constructor(private elementRef: ElementRef) {}

  buyLink = buyLink

  ngOnInit(): void {
    if (this.mode) {
      this.render.setAttribute(
        this.elementRef.nativeElement,
        'data-bs-theme',
        this.mode
      )
    }
  }

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
