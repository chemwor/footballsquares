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
  styles: ``,
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

  public fb = inject(UntypedFormBuilder)
  private renderer = inject(Renderer2)
  private authService = inject(AuthService)

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
      if (password !== confirmpwd) {
        this.errorMessage = 'Passwords do not match.'
        return
      }
      const result = await this.authService.signUp(email, password)
      if (result.success) {
        this.successMessage =
          'Sign up successful! Please check your email to confirm your account.'
        this.signupForm.reset()
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

  changePasswordType(event: any) {
    this.passwordType = event.target.checked ? 'text' : 'password'
  }

  changeconfirmPasswordType(event: any) {
    this.confirmpasswordType = event.target.checked ? 'text' : 'password'
  }
}
