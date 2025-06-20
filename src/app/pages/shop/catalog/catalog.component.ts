import { Component, inject } from '@angular/core'
import { NavigationBar3Component } from '@components/navigation-bars'
import { BannerComponent } from './components/banner/banner.component'
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component'
import { FooterComponent } from './components/footer/footer.component'
import { ProductGridComponent } from './components/product-grid/product-grid.component'
import { SearchModalComponent } from './components/search-modal/search-modal.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'shop-catalog',
  standalone: true,
  imports: [
    NavigationBar3Component,
    BannerComponent,
    BreadcrumbComponent,
    FooterComponent,
    ProductGridComponent,
    SearchModalComponent,
    SidebarComponent,
  ],
  templateUrl: './catalog.component.html',
  styles: ``,
  providers: [NgbActiveOffcanvas],
})
export class CatalogComponent {
  private offcanvasService = inject(NgbOffcanvas)

  onSettingsButtonClicked() {
    this.offcanvasService.open(SidebarComponent, { position: 'start' })
  }
}
