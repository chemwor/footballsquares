import { AfterViewInit, Component } from '@angular/core'
import { NgbPopoverConfig, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'
import { Features, produceDetail } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [NgbPopoverModule],
  templateUrl: './product-details.component.html',
  styles: ``,
})
export class ProductDetailsComponent implements AfterViewInit {
  productDetailData: Features[] = produceDetail

  constructor(config: NgbPopoverConfig) {
    // customize default values of popovers used by this component tree
    config.placement = 'end'
    config.triggers = 'hover'
    // example of usage for popperOptions
    config.popperOptions = (options) => {
      for (const modifier of options.modifiers || []) {
        if (modifier.name === 'offset' && modifier.options) {
          modifier.options['offset'] = () => [30, 8]
        }
      }
      return options
    }
  }
  ngAfterViewInit(): void {
    initAOS()
  }
}
