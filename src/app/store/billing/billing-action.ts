import { createAction, props } from '@ngrx/store'
import {
  AddressType,
  PaymentMethodType,
} from 'src/app/pages/account/pages/billing/data'

// Product
export const fetchbilling = createAction('[Order] Fetch billing ')
export const fetchbillingtSuccess = createAction(
  '[Order] Fetch billing  Success',
  props<{ adress: AddressType[] }>()
)
export const fetchbillingFailure = createAction(
  '[Data] Fetch billing  Failure',
  props<{ error: string }>()
)

// Add Billing Data
export const addbilling = createAction(
  '[Data] Add billing',
  props<{ newData: AddressType }>()
)
export const addbillingSuccess = createAction(
  '[Data] Add billing Success',
  props<{ newData: AddressType }>()
)
export const addbillingFailure = createAction(
  '[Data] Add billing Failure',
  props<{ error: string }>()
)

export const fetchPayment = createAction('[payment] fetch payment Method')
export const fetchPaymentSuccess = createAction(
  '[Order] Fetch Payment  Success',
  props<{ payment: PaymentMethodType[] }>()
)
export const fetchPaymentFailure = createAction(
  '[Order] Fetch Payment  Failure',
  props<{ error: string }>()
)

// Add Payment Data
export const addPayment = createAction(
  '[Data] Add payment',
  props<{ newData: AddressType }>()
)
export const addPaymentSuccess = createAction(
  '[Data] Add payment Success',
  props<{ newData: AddressType }>()
)
export const addPaymentFailure = createAction(
  '[Data] Add payment Failure',
  props<{ error: string }>()
)
