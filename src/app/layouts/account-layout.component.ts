import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core'
import { NavigationBar7Component } from '@components/navigation-bars/navigation-bar-7/navigation-bar-7.component'
import { toggleDocumentAttribute } from 'src/app/utils/layout'
import {
  accountData,
  AccountMenuType,
} from '../pages/account/pages/menu-sidebar'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { currency } from '../states/constants'
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap'
import { FooterComponent } from './component/footer/footer.component'

@Component({
  selector: 'layout-account',
  standalone: true,
  imports: [
    NavigationBar7Component,
    RouterModule,
    CommonModule,
    NgbOffcanvasModule,
    FooterComponent,
  ],
  template: `
    <main class="page-wrapper">
      <component-navigation-bar-7 />

      <div class="container py-5 mt-4 mt-lg-5 mb-lg-4 my-xl-5">
        <div class="row pt-sm-2 pt-lg-0">
          <aside class="col-lg-3 pe-lg-4 pe-xl-5 mt-n3">
            <div class="position-lg-sticky top-0">
              <div class="d-none d-lg-block" style="padding-top: 105px;"></div>
              <div class="offcanvas-start offcanvas-lg" id="sidebarAccount">
                <button
                  class="btn-close position-absolute top-0 end-0 mt-3 me-3 d-lg-none"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarAccount"
                  aria-label="Close"
                ></button>
                <div class="offcanvas-body">
                  <div class="pb-2 pb-lg-0 mb-4 mb-lg-5">
                    <img
                      class="d-block rounded-circle mb-2"
                      src="assets/img/avatar/02.jpg"
                      width="80"
                      alt="Isabella Bocouse"
                    />
                    <h3 class="h5 mb-1">Isabella Bocouse</h3>
                    <p class="fs-sm text-body-secondary mb-0">
                      bocouse&#64;example.com
                    </p>
                  </div>
                  @for (item of account; track $index; let last = $last) {
                    <nav
                      class="nav flex-column pb-2 pb-lg-4 "
                      [ngClass]="last ? 'mb-1' : 'mb-3'"
                    >
                      @if (item.items) {
                        <h4
                          class="fs-xs fw-medium text-body-secondary text-uppercase pb-1 mb-2"
                        >
                          {{ item.label }}
                        </h4>
                      }
                      @for (data of item.items; track $index) {
                        <a
                          class="nav-link fw-semibold py-2 px-0"
                          routerLink="{{ data.link }}"
                          routerLinkActive="active"
                        >
                          <i class="{{ data.icon }} fs-5 opacity-60 me-2"></i>
                          {{ data.label }}
                          @if (data.badge) {
                            <span class="badge bg-danger ms-auto">{{
                              data.badge
                            }}</span>
                          }
                        </a>
                      }
                      @if (!item.items) {
                        <a
                          class="nav-link fw-semibold py-2 px-0"
                          routerLink="{{ item.link }}"
                        >
                          <i class="{{ item.icon }} fs-5 opacity-60 me-2"></i>
                          {{ item.label }}
                        </a>
                      }
                    </nav>
                  }
                  <nav class="nav flex-column">
                    <a
                      class="nav-link fw-semibold py-2 px-0"
                      routerLink="/auth/sign-in"
                    >
                      <i class="ai-logout fs-5 opacity-60 me-2"></i>
                      Sign out
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </aside>

          <div class="col-lg-9 pt-4 pb-2 pb-sm-4">
            <router-outlet />
          </div>
        </div>
      </div>
      <hr class="d-none d-dark-mode-block" />
      <button
        class="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarAccount"
        (click)="openOffcanvas(content)"
      >
        <i class="ai-menu me-2"></i>
        Account menu
      </button>
    </main>

    <account-footer />
    <ng-template
      #content
      let-offcanvas
      class="offcanvas-start"
      id="sidebarAccount"
    >
      <button
        class="btn-close position-absolute top-0 end-0 mt-3 me-3 d-lg-none"
        type="button"
        data-bs-dismiss="offcanvas"
        data-bs-target="#sidebarAccount"
        aria-label="Close"
        (click)="offcanvas.close('close click')"
      ></button>
      <div class="offcanvas-body">
        <div class="pb-2 pb-lg-0 mb-4 mb-lg-5">
          <img
            class="d-block rounded-circle mb-2"
            src="assets/img/avatar/02.jpg"
            width="80"
            alt="Isabella Bocouse"
          />
          <h3 class="h5 mb-1">Isabella Bocouse</h3>
          <p class="fs-sm text-body-secondary mb-0">bocouse&#64;example.com</p>
        </div>
        @for (item of account; track $index; let last = $last) {
          <nav
            class="nav flex-column pb-2 pb-lg-4 "
            [ngClass]="last ? 'mb-1' : 'mb-3'"
          >
            @if (item.items) {
              <h4
                class="fs-xs fw-medium text-body-secondary text-uppercase pb-1 mb-2"
              >
                {{ item.label }}
              </h4>
            }
            @for (data of item.items; track $index) {
              <a
                class="nav-link fw-semibold py-2 px-0"
                routerLink="{{ data.link }}"
                routerLinkActive="active"
              >
                <i class="{{ data.icon }} fs-5 opacity-60 me-2"></i>
                {{ data.label }}
                @if (data.badge) {
                  <span class="badge bg-danger ms-auto">{{ data.badge }}</span>
                }
              </a>
            }
            @if (!item.items) {
              <a
                class="nav-link fw-semibold py-2 px-0"
                routerLink="{{ item.link }}"
              >
                <i class="{{ item.icon }} fs-5 opacity-60 me-2"></i>
                {{ item.label }}
              </a>
            }
          </nav>
        }
        <nav class="nav flex-column">
          <a class="nav-link fw-semibold py-2 px-0" routerLink="/auth/sign-in">
            <i class="ai-logout fs-5 opacity-60 me-2"></i>
            Sign out
          </a>
        </nav>
      </div>
    </ng-template>
  `,
  styles: ``,
})
export class AccountLayoutComponent implements OnInit, OnDestroy {
  account: AccountMenuType[] = accountData
  selectedCurrency = currency
  private offcanvasService = inject(NgbOffcanvas)

  ngOnInit(): void {
    toggleDocumentAttribute('class', 'bg-secondary', 'body', false)
  }
  ngOnDestroy(): void {
    toggleDocumentAttribute('class', 'bg-secondary', 'body', true)
  }

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'start' })
  }
}
