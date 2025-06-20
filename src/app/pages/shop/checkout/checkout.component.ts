import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NavigationBar8Component } from '@components/navigation-bars/navigation-bar-8/navigation-bar-8.component'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { createdBy, currency, developedByLink } from 'src/app/states/constants'

type CartItem = {
  name: string
  price: number
  quantity: number
  image: string
  discount?: number
}
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NavigationBar8Component,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgxMaskDirective,
  ],
  templateUrl: './checkout.component.html',
  styles: ``,
  providers: [provideNgxMask()],
})
export class CheckoutComponent {
  selectedCurrency = currency
  author = createdBy
  developBy = developedByLink
  checkoutForm!: FormGroup
  formSubmit!: boolean
  counterValue: number = 2
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      lastName: ['', Validators.required],
      number: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      address: ['', Validators.required],
      notes: ['', Validators.required],
      checkbox: ['', Validators.required],
    })
  }

  // get Form value
  get formValues() {
    return this.checkoutForm.controls
  }

  ngAfterViewInit(): void {
    const selector = 'needs-validation'
    const forms = document.getElementsByClassName(selector)

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i] as HTMLFormElement
      form.addEventListener(
        'submit',
        (e) => {
          if (!form.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
          }
          form.classList.add('was-validated')
        },
        false
      )
    }
  }
  // on Submit
  onSubmit() {
    this.formSubmit = true
  }

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
}
