import { SafeHtml } from '@angular/platform-browser'
import {
  paymentElectronic,
  paymentMasterCard,
  paymentVisa,
} from '@components/icons'

export type AddressType = {
  id?: number
  type: string
  primary?: string
  address: string
  city: string
  state: string
  postal_code: string
  country: string
}

export type PaymentMethodType = {
  type: string
  name?: string
  card_type?: string
  last_four_digits?: string
  expiration?: string
  status?: string
  description?: string
  email?: string
  icons?: any
  sanitizedIcon?: SafeHtml
}

export const addresses: AddressType[] = [
  {
    id: 1,
    type: 'Billing address #1',
    primary: 'Primary',
    address: '314 Robinson Lane',
    city: 'Wilmington',
    state: 'DE',
    postal_code: '19805',
    country: 'USA',
  },
  {
    id: 1,
    type: 'Billing address #2',
    address: '401 Magnetic Drive Unit 2',
    city: 'Toronto',
    state: 'Ontario',
    postal_code: 'M3J 3H9',
    country: 'Canada',
  },
]

export const paymentMethod: PaymentMethodType[] = [
  {
    type: 'credit_card',
    name: 'Isabella Bocouse',
    card_type: 'Visa',
    last_four_digits: '9016',
    expiration: 'Debit - Expires 03/24',
    status: 'Primary',
    icons: paymentVisa,
  },
  {
    type: 'credit_card',
    name: 'Isabella Bocouse',
    card_type: 'MasterCard',
    last_four_digits: '4242',
    expiration: 'Checking - Expires 01/25',
    icons: paymentMasterCard,
  },
  {
    type: 'electronic_payment',
    name: 'Isabella Bocouse',
    description: 'Electronic payment system',
    email: 'bocouse@example.com',
    icons: paymentElectronic,
  },
]
