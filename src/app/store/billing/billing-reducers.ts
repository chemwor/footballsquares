import { createReducer, on, Action } from '@ngrx/store'
import {
  addPaymentSuccess,
  addbillingSuccess,
  fetchPayment,
  fetchPaymentSuccess,
  fetchbilling,
  fetchbillingtSuccess,
} from './billing-action'
import {
  AddressType,
  PaymentMethodType,
} from 'src/app/pages/account/pages/billing/data'
import { state } from '@angular/animations'

export type BillState = {
  address: AddressType[]
  payment: PaymentMethodType[]
}

export const initialState: BillState = {
  address: [],
  payment: [],
}

export const BillReducer = createReducer(
  initialState,
  on(fetchbilling, (state) => {
    return { ...state }
  }),
  on(fetchbillingtSuccess, (state, { adress }) => {
    return { ...state, address: adress }
  }),

  on(addbillingSuccess, (state, { newData }) => {
    return { ...state, address: [...state.address, newData], error: null }
  }),

  on(fetchPayment, (state) => {
    return { ...state }
  }),

  on(fetchPaymentSuccess, (state, { payment }) => {
    return { ...state, payment }
  }),
  on(addPaymentSuccess, (state, { newData }) => {
    return { ...state, payment: [...state.payment, newData], error: null }
  })
)

// Selector
export function reducer(state: BillState | undefined, action: Action) {
  return BillReducer(state, action)
}
