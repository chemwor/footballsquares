import {
  Component,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
  inject,
} from '@angular/core'
import { AddressType, addresses, PaymentMethodType } from './data'
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import {
  addPayment,
  addbilling,
  fetchPayment,
  fetchbilling,
} from '@store/billing/billing-action'
import { getBillingData, getpaymentData } from '@store/billing/billing-selector'
import { Store } from '@ngrx/store'
import { DomSanitizer } from '@angular/platform-browser'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { CommonModule } from '@angular/common'
import { currentYear } from 'src/app/states/constants'

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgbTooltipModule,
    CommonModule,
  ],
  templateUrl: './billing.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: ``,
  providers: [provideNgxMask()],
})
export class BillingComponent implements OnInit {
  allAdresses!: AddressType[]
  allPaymentMethod!: PaymentMethodType[]
  adressForm!: UntypedFormGroup
  paymentForm!: UntypedFormGroup
  currentYear = currentYear
  formSubmitted: boolean = false
  private store = inject(Store)
  public renderer = inject(Renderer2)
  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchbilling())
    this.store.select(getBillingData).subscribe((data) => {
      this.allAdresses = data
    })
    this.store.dispatch(fetchPayment())
    this.store.select(getpaymentData).subscribe((data) => {
      this.allPaymentMethod = data
    })
    // icons senitize
    this.allPaymentMethod = this.allPaymentMethod.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.icons),
      }
    })

    this.adressForm = this.formBuilder.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      adreess1: ['', Validators.required],
      adress2: ['', Validators.required],
      code: ['', Validators.required],
    })

    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_four_digits: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required],
    })
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() {
    return this.adressForm.controls
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true })
  }

  // open Payment modal
  openPaymentModal(econtent: any) {
    this.modalService.open(econtent, { size: '', centered: true })
  }

  // AddBilling
  addBilling() {
    if (this.adressForm.valid) {
      this.formSubmitted = true
      const newData = {
        type: 'Billing address',
        ...this.adressForm.value,
      }
      this.store.dispatch(addbilling({ newData }))
      this.modalService.dismissAll()
    } else {
      this.renderer.addClass(
        document.querySelector('.needs-validation'),
        'was-validated'
      )
    }
  }

  // AddBilling
  addPayment() {
    if (this.paymentForm.valid) {
      this.formSubmitted = true
      const newData = {
        icons: ` <svg width="52" height="42" viewBox="0 0 52 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31.4109 30.6159H20.5938V10.7068H31.4111L31.4109 30.6159Z" fill="#FF5F00"></path>
      <path d="M21.28 20.6617C21.28 16.6232 23.1264 13.0256 26.0016 10.7072C23.8252 8.94968 21.1334 7.99582 18.3618 8.00001C11.5344 8.00001 6 13.6688 6 20.6617C6 27.6547 11.5344 33.3235 18.3618 33.3235C21.1334 33.3277 23.8254 32.3738 26.0018 30.6163C23.1268 28.2983 21.28 24.7005 21.28 20.6617Z" fill="#EB001B"></path>
      <path d="M46.0028 20.6617C46.0028 27.6547 40.4684 33.3235 33.641 33.3235C30.8691 33.3276 28.1768 32.3738 26 30.6163C28.876 28.2979 30.7224 24.7005 30.7224 20.6617C30.7224 16.623 28.876 13.0256 26 10.7072C28.1768 8.94974 30.8689 7.99589 33.6408 8.00001C40.4682 8.00001 46.0026 13.6688 46.0026 20.6617" fill="#F79E1B"></path>
      </svg>`,
        card_type: 'Visa',
        ...this.paymentForm.value,
      }
      this.store.dispatch(addPayment({ newData }))
      this.modalService.dismissAll()
    } else {
      this.renderer.addClass(
        document.querySelector('.needs-validation'),
        'was-validated'
      )
    }
  }
}

// if (this.ctaForm.valid) {
//   this.formSubmit = true;
// } else {
//   this.renderer.addClass(
//     document.querySelector('.needs-validation'),
//     'was-validated'
//   );
// }
// }
