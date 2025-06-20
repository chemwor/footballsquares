import { Component } from '@angular/core'
import { agencyTeam, AgencyTeamType } from '../../data'

@Component({
  selector: 'creative-agency-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styles: ``,
})
export class TeamComponent {
  allAgencyTeam: AgencyTeamType[] = agencyTeam
}
