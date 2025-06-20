import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

// Action
import {
  addPayment,
  addPaymentFailure,
  addPaymentSuccess,
  addbilling,
  addbillingFailure,
  addbillingSuccess,
  fetchPayment,
  fetchPaymentSuccess,
  fetchbilling,
  fetchbillingFailure,
  fetchbillingtSuccess,
} from './billing-action'
import { CrudService } from '@core/services/crud.service'

@Injectable()
export class BillEffects {
  // BillingAdress
  fetchbillingData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchbilling),
      mergeMap(() =>
        this.CrudService.fetchbillAddress().pipe(
          map((adress) => fetchbillingtSuccess({ adress })),
          catchError((error) => of(fetchbillingFailure({ error })))
        )
      )
    )
  )

  addBilling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addbilling),
      mergeMap(({ newData }) =>
        this.CrudService.addbillAddress(newData).pipe(
          map(() => addbillingSuccess({ newData })),
          catchError((error) => of(addbillingFailure({ error })))
        )
      )
    )
  )

  // BillingPayment Method
  fetchPaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPayment),
      mergeMap(() =>
        this.CrudService.fetchPaymentMethod().pipe(
          map((payment) => fetchPaymentSuccess({ payment })),
          catchError((error) => of(fetchbillingFailure({ error })))
        )
      )
    )
  )

  addPaymentmethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPayment),
      mergeMap(({ newData }) =>
        this.CrudService.addPayment(newData).pipe(
          map(() => addPaymentSuccess({ newData })),
          catchError((error) => of(addPaymentFailure({ error })))
        )
      )
    )
  )
  constructor(
    private actions$: Actions,
    private CrudService: CrudService
  ) {}
}
