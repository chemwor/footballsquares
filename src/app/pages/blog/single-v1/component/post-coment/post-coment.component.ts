import { Component } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { CommentType, commentsData } from '../../../single-v3/data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'single-post-comment',
  standalone: true,
  imports: [NgbCollapseModule, CommonModule],
  templateUrl: './post-coment.component.html',
  styles: ``,
})
export class PostComentComponent {
  isCollapsed = true
  postComment: CommentType[] = commentsData
}
