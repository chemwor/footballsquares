import { Component } from '@angular/core'
import { createdBy, developedByLink } from 'src/app/states/constants'
import { RouterModule } from '@angular/router'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [RouterModule, NgbTooltipModule],
  templateUrl: './password-recovery.component.html',
  styles: ``,
})
export class PasswordRecoveryComponent {
  author = createdBy
  developBy = developedByLink
}
