import { Component } from '@angular/core'
import { teamData, TeamType } from '../../data'

@Component({
  selector: 'about-agency-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styles: ``,
})
export class TeamComponent {
  allTeamData: TeamType[] = teamData
}
