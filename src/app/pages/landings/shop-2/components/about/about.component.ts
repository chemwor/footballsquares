import { Component } from '@angular/core'

@Component({
  selector: 'shop2-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styles: ``,
})
export class AboutComponent {
  aboutImage = [
    'assets/img/landing/shop-2/gallery/01.jpg',
    'assets/img/landing/shop-2/gallery/02.jpg',
    'assets/img/landing/shop-2/gallery/03.jpg',
  ]

  aboutImage2 = [
    'assets/img/landing/shop-2/gallery/04.jpg',
    'assets/img/landing/shop-2/gallery/05.jpg',
    'assets/img/landing/shop-2/gallery/06.jpg',
  ]
}
