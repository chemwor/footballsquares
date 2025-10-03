import { Route } from '@angular/router'
import { SigninComponent } from './signin/signin.component'
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component'
import { SignupComponent } from './signup/signup.component'
import { SigninupComponent } from './signinup/signinup.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'signin',
    component: SigninComponent,
    data: { title: 'Account - Sign In' },
  },
  {
    path: 'sign-in',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    data: { title: 'Account - Password Recovery' },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Account - Sign Up' },
  },
  {
    path: 'sign-up',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
  {
    path: 'sign-in-n-up',
    component: SigninupComponent,
    data: { title: 'Account - Sign In / Up' },
  },
]
