import { Component } from '@angular/core'
import { ClientProductDataType, clientProductData } from '../../data'

@Component({
  selector: 'about-product-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styles: ``,
})
export class ClientComponent {
  clientProductData: ClientProductDataType[] = clientProductData
}
