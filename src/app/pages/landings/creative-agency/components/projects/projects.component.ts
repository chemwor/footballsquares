import { CommonModule } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry'
import { currentYear } from 'src/app/states/constants'

@Component({
  selector: 'creative-agency-projects',
  standalone: true,
  imports: [NgxMasonryModule, CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styles: ``,
})
export class ProjectsComponent {
  projectList = [
    {
      id: 1,
      img: 'assets/img/portfolio/grid/07.jpg',
      label: 'Healthy Yellow',
      type: 'Branding, Packaging',
      year: currentYear,
      width: '512px',
    },
    {
      id: 2,
      img: 'assets/img/portfolio/grid/08.jpg',
      label: 'Sen Jonson',
      type: 'Stationery design',
      year: currentYear,
      width: '704px',
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/09.jpg',
      label: 'Gradient',
      type: 'Branding,Packaging',
      year: currentYear,
      width: '467px',
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/10.jpg',
      label: 'D.G.Vent',
      type: 'Stationery design',
      year: '2021',
      width: '605px',
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/11.jpg',
      label: 'Doe design',
      type: 'Branding, Stationery',
      year: '2021',
      width: '550px',
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/12.jpg',
      label: 'The Studio',
      type: 'Web design',
      year: '2020',
      width: '470px',
    },
  ]

  allproject = this.projectList
  activeFilter: string = 'All'

  // Type Filter
  filterType(type: string) {
    if (type !== 'All') {
      this.projectList = this.allproject.filter((item) => item.type.match(type))
    } else {
      this.projectList = this.allproject
    }
    this.activeFilter = type
  }

  public options: NgxMasonryOptions = {
    horizontalOrder: true,
  }
}
