import { Component, Renderer2, inject } from '@angular/core'
import { AuthLayoutComponent } from '../auth-layout.component'
import { RouterModule } from '@angular/router'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { createdBy, developedByLink } from 'src/app/states/constants'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: #fff;
      color: #222;
      border-radius: 12px;
      padding: 2rem 2.5rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      max-width: 90vw;
      width: 100%;
      max-width: 400px;
      text-align: center;
      z-index: 10000;
    }
    .modal-content h2 {
      margin-bottom: 1rem;
    }
    .modal-content button {
      margin-top: 1.5rem;
    }
  `],
})
export class SignupComponent {
  author = createdBy
  developBy = developedByLink

  signupForm!: UntypedFormGroup
  submit!: boolean
  passwordType: string = 'password'
  confirmpasswordType: string = 'password'
  errorMessage = ''
  successMessage = ''
  showVerifyModal = false

  public fb = inject(UntypedFormBuilder)
  private renderer = inject(Renderer2)
  private authService = inject(AuthService)
  private router = inject(Router)

  constructor() {
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpwd: ['', [Validators.required]],
    })
  }
  async signup() {
    if (this.signupForm.valid) {
      this.submit = true
      this.errorMessage = ''
      this.successMessage = ''
      const email = this.signupForm.value.email
      const password = this.signupForm.value.password
      const confirmpwd = this.signupForm.value.confirmpwd
      const fname = this.signupForm.value.fname
      if (password !== confirmpwd) {
        this.errorMessage = 'Passwords do not match.'
        return
      }
      const result = await this.authService.signUp(email, password, fname)
      if (result.success) {
        this.successMessage =
          'Sign up successful! Please check your email to confirm your account.'
        this.signupForm.reset()
        this.showVerifyModal = true
      } else {
        this.errorMessage = result.error || 'An error occurred during sign up.'
      }
    } else {
      this.renderer.addClass(
        document.querySelector('.needs-validation'),
        'was-validated'
      )
    }
  }

  closeVerifyModal() {
    this.showVerifyModal = false
    this.router.navigate(['/'])
  }

  changePasswordType(event: any) {
    this.passwordType = event.target.checked ? 'text' : 'password'
  }

  changeconfirmPasswordType(event: any) {
    this.confirmpasswordType = event.target.checked ? 'text' : 'password'
  }
}
