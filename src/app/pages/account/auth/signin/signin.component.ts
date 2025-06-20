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

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup
  formSubmitted: boolean = false
  showPassword: boolean = false
  author = createdBy
  developBy = developedByLink

  constructor(private fb: FormBuilder) {}

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
  onSubmit(): void {
    this.formSubmitted = true

    if (this.loginForm.valid) {
      const email = this.formValues['email'].value // Get the username from the form
      const password = this.formValues['password'].value // Get the password from the form
    }
  }
}
