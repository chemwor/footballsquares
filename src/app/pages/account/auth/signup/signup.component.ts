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
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
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
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255,255,255,0.7);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader-spinner {
      border: 8px solid #f3f3f3;
      border-top: 8px solid #B1202A;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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
  isLoading = false;

  public fb = inject(UntypedFormBuilder)
  private renderer = inject(Renderer2)
  private authService = inject(AuthService)
  private router = inject(Router)

  constructor() {
    this.signupForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpwd: ['', [Validators.required]],
    })
  }
  async signup() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.submit = true
      this.errorMessage = ''
      this.successMessage = ''
      const email = this.signupForm.value.email
      const password = this.signupForm.value.password
      const confirmpwd = this.signupForm.value.confirmpwd
      const displayName = this.signupForm.value.displayName
      if (password !== confirmpwd) {
        this.errorMessage = 'Passwords do not match.'
        this.isLoading = false;
        return
      }
      const result = await this.authService.signUp(email, password, displayName)
      this.isLoading = false;
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
      this.isLoading = false;
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
