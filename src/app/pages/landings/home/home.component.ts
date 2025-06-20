import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { NgxSmoothScrollModule } from '@boatzako/ngx-smooth-scroll'
import { NavigationBarComponent } from '@components/navigation-bars'
import { initAOS } from 'src/app/utils/init-aos'
import { CustomizerComponent } from './component/customizer/customizer.component'
import { DemoComponent } from './component/demo/demo.component'
import { FeaturesComponent } from './component/features/features.component'
import { FooterComponent } from './component/footer/footer.component'
import { HeroComponent } from './component/hero/hero.component'
import { InnerPagesComponent } from './component/inner-pages/inner-pages.component'
import { SubscribeComponent } from './component/subscribe/subscribe.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavigationBarComponent,
    NgxSmoothScrollModule,
    DemoComponent,
    FeaturesComponent,
    FooterComponent,
    SubscribeComponent,
    CustomizerComponent,
    InnerPagesComponent,
    HeroComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initAOS()
  }
}
