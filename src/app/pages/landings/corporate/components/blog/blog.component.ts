import { Component } from '@angular/core'
import { corporateBlog, CorporateType } from '../../data'

@Component({
  selector: 'corporate-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styles: ``,
})
export class BlogComponent {
  corporateblog: CorporateType[] = corporateBlog
}
