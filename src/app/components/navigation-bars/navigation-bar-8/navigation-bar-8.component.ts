import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  TemplateRef,
  inject,
} from '@angular/core'
import { HorizontalAppMenu } from '@components/app-menu/horizontal-app-menu/horizontal-app-menu.component'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component'
import { VerticalMenuButtonComponent } from '@components/app-menu/vertical-menu-button.component'
import { RouterModule } from '@angular/router'
import {
  NgbCollapseModule,
  NgbModal,
  NgbOffcanvas,
  NgbOffcanvasModule,
} from '@ng-bootstrap/ng-bootstrap'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'app-navigation-bar-8',
  standalone: true,
  imports: [
    HorizontalAppMenu,
    LogoBoxComponent,
    ThemeSwitcherComponent,
    NgbCollapseModule,
    VerticalMenuButtonComponent,
    RouterModule,
    NgbOffcanvasModule,
  ],
  templateUrl: './navigation-bar-8.component.html',
  styleUrl: './navigation-bar-8.component.scss',
})
export class NavigationBar8Component {
  @Input() mode?: 'light' | 'dark'
  selectedCurrency = currency
  isMenuCollapsed = true
  private render = inject(Renderer2)
  private offcanvasService = inject(NgbOffcanvas)
  private modalService = inject(NgbModal)

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
  // cart oFfcanvas open
  offCanvasOpen(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' })
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
  openWindowCustomClass(content: TemplateRef<any>) {
    this.modalService.open(content, { windowClass: 'dark-modal' })
  }
}
