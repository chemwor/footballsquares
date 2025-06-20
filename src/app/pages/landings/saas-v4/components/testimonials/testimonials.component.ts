import { Component } from '@angular/core'
import { testimonialIntegration, TestimonialType } from '../../data'
import { NgxMasonryModule } from 'ngx-masonry'

@Component({
  selector: 'saas-v4-testimonials',
  standalone: true,
  imports: [NgxMasonryModule],
  templateUrl: './testimonials.component.html',
  styles: ``,
})
export class TestimonialsComponent {
  testimonialData: TestimonialType[] = testimonialIntegration
}
