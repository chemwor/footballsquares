import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  inject,
} from '@angular/core'
import { HorizontalAppMenu } from '@components/app-menu/horizontal-app-menu/horizontal-app-menu.component'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component'
import { NgbCollapseModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { VerticalMenuButtonComponent } from '@components/app-menu/vertical-menu-button.component'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'component-navigation-bar-4',
  standalone: true,
  imports: [
    HorizontalAppMenu,
    LogoBoxComponent,
    ThemeSwitcherComponent,
    NgbCollapseModule,
    VerticalMenuButtonComponent,
    RouterModule,
  ],
  templateUrl: './navigation-bar-4.component.html',
  styles: ``,
})
export class NavigationBar4Component implements OnInit {
  @Input() mode?: 'light' | 'dark'
  isMenuCollapsed = true
  private render = inject(Renderer2)
  private offcanvasService = inject(NgbOffcanvas)

  constructor(private elementRef: ElementRef) {}

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

  // cart oFfcanvas open
  offCanvasOpen(contents: TemplateRef<any>) {
    this.offcanvasService.open(contents, {
      position: 'end',
      panelClass: 'width-auto py-2 p-sm-4 p-md-5 ',
    })
  }
}
