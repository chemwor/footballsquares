import { Component } from '@angular/core'
import { favoritesData, FavoritesType } from '../../data'
import { currency } from 'src/app/states/constants'
import { RouterModule } from '@angular/router'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'pages-favourite-items',
  standalone: true,
  imports: [RouterModule, NgbTooltipModule, CommonModule],
  templateUrl: './favourite-items.component.html',
  styles: ``,
})
export class FavouriteItemsComponent {
  allFavouriteItem: FavoritesType[] = favoritesData
  selectedCurrency = currency
  selectedColor: string = ''

  selectColor(colorName: string) {
    this.selectedColor = colorName
  }
}
