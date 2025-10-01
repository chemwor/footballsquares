import { Component } from '@angular/core'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'conference-tickets',
  standalone: true,
  imports: [],
  templateUrl: './tickets.component.html',
  styles: ``,
})
export class TicketsComponent {
  selectedCurrency = currency
  content = [
    'Unlimited boards',
    'Choose sport & match',
    'Shareable link to invite players',
    'Approve/decline squares',
    'Automatic winner highlights + email announcements',
    'Basic email notifications',
  ]
  stream = [
    'Everything in Standard, plus',
    'Automated board creation for selected games',
    'Automatic email marketing (invites + reminders sent to players)',
    'Priority support',
  ]
}
