import { Component } from '@angular/core'
import { nextProject, NextProjectType } from '../../data'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'single2-projects',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './projects.component.html',
  styles: ``,
})
export class ProjectsComponent {
  nextProjectData: NextProjectType[] = nextProject
}
