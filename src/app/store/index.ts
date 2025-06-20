import type { ActionReducerMap } from '@ngrx/store'
import { BillReducer, BillState } from './billing/billing-reducers'

export type RootReducerState = {
  Billing: BillState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  Billing: BillReducer,
}
