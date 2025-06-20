import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  inject,
} from '@angular/core'
import { HorizontalAppMenu } from '@components/app-menu/horizontal-app-menu/horizontal-app-menu.component'
import { LogoBoxComponent } from '@components/logo-box/logo-box.component'
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component'
import {
  NgbCollapseModule,
  NgbModal,
  NgbOffcanvas,
  NgbOffcanvasModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { VerticalMenuButtonComponent } from '@components/app-menu/vertical-menu-button.component'
import { currency } from 'src/app/states/constants'
import { RouterModule } from '@angular/router'

type CartItem = {
  name: string
  price: number
  quantity: number
  image: string
  discount?: number
}
@Component({
  selector: 'component-navigation-bar-3',
  standalone: true,
  imports: [
    HorizontalAppMenu,
    LogoBoxComponent,
    ThemeSwitcherComponent,
    NgbOffcanvasModule,
    NgbCollapseModule,
    VerticalMenuButtonComponent,
    RouterModule,
    NgbTooltipModule,
  ],
  templateUrl: './navigation-bar-3.component.html',
  styles: `
    .offcanvas-body {
      overflow-y: auto !important;
    }
  `,
})
export class NavigationBar3Component implements OnInit {
  @Input() mode?: 'light' | 'dark'
  private modalService = inject(NgbModal)

  selectedCurrency = currency
  isMenuCollapsed = true
  private render = inject(Renderer2)
  private offcanvasService = inject(NgbOffcanvas)

  cartItems: CartItem[] = [
    {
      image: 'assets/img/shop/cart/01.png',
      name: 'Candle in concrete bowl',
      price: 11.0,
      quantity: 6,
      discount: 15.0,
    },
    {
      image: 'assets/img/shop/cart/02.png',
      name: 'Exquisite glass vase',
      price: 23.0,
      quantity: 2,
    },
    {
      image: 'assets/img/shop/cart/03.png',
      name: 'Set for a dinner party of 7 items',
      price: 47.0,
      quantity: 12,
    },
  ]

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

  // Method to increment counter
  incrementCounter(index: number) {
    this.cartItems[index].quantity++
  }

  // Method to decrement counter
  decrementCounter(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--
    }
  }
  // cart oFfcanvas open
  offCanvasOpen(contents: TemplateRef<any>) {
    this.offcanvasService.open(contents, {
      position: 'end',
      panelClass: 'width-auto py-2 p-sm-4 p-md-5 ',
    })
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
