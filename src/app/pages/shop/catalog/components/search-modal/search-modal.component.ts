import { Component } from '@angular/core'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'catalog-search-modal',
  standalone: true,
  imports: [],
  template: `
    <div
      class="modal fade"
      id="searchModal"
      tabindex="-1"
      role="dialog"
      data-focus-input="#search"
    >
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header d-block position-relative border-0 pb-3">
            <form class="position-relative w-100 mt-2 mb-4">
              <button
                class="btn-close position-absolute top-50 end-0 translate-middle-y m-0 me-n1"
                type="reset"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <i
                class="ai-search fs-xl position-absolute top-50 start-0 translate-middle-y ms-3"
              ></i>
              <input
                class="form-control form-control-lg px-5"
                type="search"
                placeholder="Type to search"
                data-focus-on-open='["modal", "#searchModal"]'
              />
            </form>
            <div class="fs-xs fw-medium text-body-secondary text-uppercase">
              Suggestions
            </div>
          </div>
          <div class="modal-body pt-3">
            <div class="d-flex align-items-center border-bottom pb-4 mb-4">
              <a
                class="position-relative d-inline-block flex-shrink-0 bg-secondary rounded-1"
                routerLink="/shop/product"
              >
                <span
                  class="badge bg-success position-absolute top-0 start-100 translate-middle ms-n1"
                  >Shop</span
                >
                <img
                  src="assets/img/shop/cart/01.png"
                  width="90"
                  alt="Product"
                />
              </a>
              <div class="ps-3">
                <h4 class="h6 mb-2">
                  <a routerLink="/shop/product">Candle in concrete bowl</a>
                </h4>
                <span class="mb-0 me-2">{{ selectedCurrency }}11.00</span>
                <del class="fs-sm text-body-secondary ms-auto"
                  >{{ selectedCurrency }}15.00</del
                >
              </div>
            </div>
            <div class="d-flex align-items-center border-bottom pb-4 mb-4">
              <a
                class="position-relative d-inline-block flex-shrink-0"
                href="javascript:void(0);"
              >
                <span
                  class="badge bg-info position-absolute top-0 start-100 translate-middle ms-n1"
                  >Blog</span
                >
                <img
                  class="rounded-1"
                  src="assets/img/landing/shop-1/instagram/02.jpg"
                  width="90"
                  alt="Post"
                />
              </a>
              <div class="ps-3">
                <h4 class="h6 mb-0">
                  <a href="javascript:void(0);"
                    >Bedroom decoration explained. Tips &amp; tricks from the
                    field experts.</a
                  >
                </h4>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <a
                class="position-relative d-inline-block flex-shrink-0 bg-secondary rounded-1"
                routerLink="/shop/product"
              >
                <span
                  class="badge bg-success position-absolute top-0 start-100 translate-middle ms-n1"
                  >Shop</span
                >
                <img
                  src="assets/img/shop/cart/02.png"
                  width="90"
                  alt="Product"
                />
              </a>
              <div class="ps-3">
                <h4 class="h6 mb-2">
                  <a routerLink="/shop/product">Exquisite glass vase</a>
                </h4>
                <span class="mb-0 me-2">{{ selectedCurrency }}23.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SearchModalComponent {
  selectedCurrency = currency
}
