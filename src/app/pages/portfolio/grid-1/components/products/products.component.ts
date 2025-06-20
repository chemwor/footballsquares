import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry'

@Component({
  selector: 'grid1-products',
  standalone: true,
  imports: [NgxMasonryModule, CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styles: ``,
})
export class ProductsComponent {
  projectList = [
    {
      id: 1,
      img: 'assets/img/portfolio/grid/01.jpg',
      label: 'Strategy and design for a handmade tableware company',
      type: 'Branding, Strategy',
    },
    {
      id: 2,
      img: 'assets/img/portfolio/grid/02.jpg',
      label: 'Design for eco bags and merch',
      type: 'Product design',
    },
    {
      id: 3,
      img: 'assets/img/portfolio/grid/03.jpg',
      label: 'Book cover design Twin Fish',
      type: 'Cover design',
    },
    {
      id: 4,
      img: 'assets/img/portfolio/grid/04.jpg',
      label: 'Bottle for French perfume brand',
      type: 'Packaging design',
    },
    {
      id: 5,
      img: 'assets/img/portfolio/grid/05.jpg',
      label: 'Toothbrushes made from eco materials',
      type: 'Product design',
    },
    {
      id: 6,
      img: 'assets/img/portfolio/grid/06.jpg',
      label: 'Business cards and identity for Sen Jonson',
      type: 'Identity design',
    },
  ]

  allproject = this.projectList

  public options: NgxMasonryOptions = {
    horizontalOrder: true,
  }

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
