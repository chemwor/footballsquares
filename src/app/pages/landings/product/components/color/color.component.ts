import { CommonModule } from '@angular/common'
import { AfterViewInit, Component } from '@angular/core'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'product-color',
  standalone: true,
  imports: [NgbNavModule, CommonModule],
  templateUrl: './color.component.html',
  styles: ``,
})
export class ColorComponent implements AfterViewInit {
  headphoneColor: string = 'green'
  colorText: string = 'Green day'

  ngAfterViewInit(): void {
    initAOS()
  }

  changeImage(color: any, event: any) {
    this.headphoneColor = color
    this.colorText = (event.target as HTMLInputElement).value
  }
}
