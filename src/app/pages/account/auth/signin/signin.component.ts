import { Component, OnInit } from '@angular/core'
import { AuthLayoutComponent } from '../auth-layout.component'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { createdBy, developedByLink } from 'src/app/states/constants'
import { AuthService } from 'src/app/services/auth.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup
  formSubmitted: boolean = false
  showPassword: boolean = false
  author = createdBy
  developBy = developedByLink
  errorMessage: string = ''
  successMessage: string = ''

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formValues() {
    return this.loginForm.controls
  }

  /**
   * On submit form
   */
  async onSubmit(): Promise<void> {
    this.formSubmitted = true
    this.errorMessage = ''
    this.successMessage = ''

    if (this.loginForm.valid) {
      const email = this.formValues['email'].value
      const password = this.formValues['password'].value

      const result = await this.authService.signIn(email, password)

      if (result.success) {
        this.successMessage = 'Successfully signed in! Redirecting...'
        // AuthService will handle navigation automatically
      } else {
        this.errorMessage = result.error || 'An error occurred during sign in'
      }
    }
  }

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      const { error } = await this.authService.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin, // Ensure this matches your Supabase dashboard setting
        },
      })
      if (error) {
        this.errorMessage = error.message
        console.error('Google sign-in error:', error)
      }
    } catch (err) {
      this.errorMessage = 'An unexpected error occurred during Google sign-in.'
    }
  }

  /**
   * Sign in with Facebook
   */
  async signInWithFacebook(): Promise<void> {
    this.errorMessage = ''

    const result = await this.authService.signInWithFacebook()

    if (!result.success) {
      this.errorMessage = result.error || 'An error occurred during Facebook sign in'
    }
  }
}
