import { Component } from '@angular/core'
import { CategoryDatatype, categoryData } from '../../data'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'shop-1-categories',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './categories.component.html',
  styles: ``,
})
export class CategoriesComponent {
  categoryData: CategoryDatatype[] = categoryData
}
