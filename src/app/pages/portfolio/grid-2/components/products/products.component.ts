import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgxMasonryModule } from 'ngx-masonry'
import { currentYear } from 'src/app/states/constants'

@Component({
  selector: 'grid2-products',
  standalone: true,
  imports: [NgxMasonryModule, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styles: ``,
})
export class ProductsComponent {
  projectList = [
    {
      id: 1,
      img: 'assets/img/portfolio/grid/07.jpg',
      label: 'Healthy Yellow',
      type: 'Branding, Packaging',
      year: currentYear,
    },
    {
      id: 2,
      img: 'assets/img/portfolio/grid/08.jpg',
      label: 'Sen Jonson',
      type: 'Stationery design',
      year: currentYear,
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/09.jpg',
      label: 'Gradient',
      type: 'Branding,Packaging',
      year: currentYear,
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/10.jpg',
      label: 'D.G.Vent',
      type: 'Stationery design',
      year: '2021',
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/11.jpg',
      label: 'Doe design',
      type: 'Branding, Stationery',
      year: '2021',
    },
    {
      id: 1,
      img: 'assets/img/portfolio/grid/12.jpg',
      label: 'The Studio',
      type: 'Web design',
      year: '2020',
    },
  ]

  allproject = this.projectList
  type: string = 'All'

  // Type Filter
  filterType(type: string) {
    this.type = type
    if (type != 'All') {
      this.projectList = this.allproject.filter((item) => item.type.match(type))
    } else {
      this.projectList = this.allproject
    }
  }
}
