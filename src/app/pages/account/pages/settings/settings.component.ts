import { CommonModule } from '@angular/common'
import { Component, ElementRef, ViewChild } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { currency } from 'src/app/states/constants'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'account-settings',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, NgxMaskDirective, RouterModule],
  templateUrl: './settings.component.html',
  providers: [provideNgxMask()],

  styles: `
    .dropdown-toggle::after {
      display: none;
    }
    .dropdown-toggle {
      align-items: unset !important;
    }
  `,
})
export class SettingsComponent {
  imageURL = 'assets/img/avatar/02.jpg'
  selectedCurrency = currency
  passwordType: string = 'password'
  password1Type: string = 'password'
  password2Type: string = 'password'

  @ViewChild('checkboxList') checkboxList!: ElementRef

  fileChange(event: any) {
    const fileList: FileList = event.target.files
    if (fileList.length > 0) {
      const file: File = fileList[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imageURL = reader.result as string
      }
    }
  }

  toggleAllCheckboxes() {
    const checkboxes = this.checkboxList.nativeElement.querySelectorAll(
      'input[type="checkbox"]'
    )
    let initialState = true
    for (const checkbox of checkboxes) {
      if (!checkbox.checked) {
        initialState = false
        break
      }
    }
    checkboxes.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = !initialState
    })
  }

  changePasswordType(event: any) {
    this.passwordType = event.target.checked ? 'text' : 'password'
  }
  changeNewPasswordType(event: any) {
    this.password1Type = event.target.checked ? 'text' : 'password'
  }
  confirmPasswordType(event: any) {
    this.password2Type = event.target.checked ? 'text' : 'password'
  }
}
