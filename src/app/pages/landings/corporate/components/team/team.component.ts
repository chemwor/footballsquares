import { AfterViewInit, Component } from '@angular/core'
import { CorporateTeamType, team2Data, teamData } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'corporate-team',
  standalone: true,
  imports: [],
  templateUrl: './team.component.html',
  styles: ``,
})
export class TeamComponent implements AfterViewInit {
  corporateTeam: CorporateTeamType[] = teamData
  corporateTeam2: CorporateTeamType[] = team2Data

  ngAfterViewInit(): void {
    initAOS()
  }
}
