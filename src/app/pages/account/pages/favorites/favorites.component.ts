import { Component } from '@angular/core'
import { FavouriteItemsComponent } from './component/favourite-items/favourite-items.component'

@Component({
  selector: 'account-favorites',
  standalone: true,
  imports: [FavouriteItemsComponent],
  templateUrl: './favorites.component.html',
  styleUrls: [],
})
export class FavoritesComponent {}
