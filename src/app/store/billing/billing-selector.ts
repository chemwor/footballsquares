import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BillState } from './billing-reducers'

export const selectDataState = createFeatureSelector<BillState>('Billing')

export const getBillingData = createSelector(
  selectDataState,
  (state: BillState) => state.address
)
export const getpaymentData = createSelector(
  selectDataState,
  (state: BillState) => state.payment
)
