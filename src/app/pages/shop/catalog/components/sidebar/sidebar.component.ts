import { Component, inject } from '@angular/core'
import {
  NgbAccordionModule,
  NgbActiveOffcanvas,
} from '@ng-bootstrap/ng-bootstrap'
import {
  brandData,
  BrandType,
  colorData,
  ColorType,
  livingCategory,
  LivingCategoryType,
} from '../../data'
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'catalog-sidebar',
  standalone: true,
  imports: [NgbAccordionModule, NgxSliderModule, CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styles: `
    :host {
      position: relative;
    }
  `,
})
export class SidebarComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas)

  colorsData: ColorType[] = colorData
  allBrandData: BrandType[] = brandData
  allLivingcategoryData: LivingCategoryType[] = livingCategory

  // Range slider value set
  value: number = 10
  highValue: number = 50
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return '$' + value
    },
  }

  get formattedValue(): string {
    return '$' + this.value
  }
}
