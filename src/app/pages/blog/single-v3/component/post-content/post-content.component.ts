import { CommonModule } from '@angular/common'
import { AfterViewInit, Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  CommentType,
  MostPopularType,
  TrendingType,
  commentsData,
  mostPopularArticle,
  trendingPost,
} from '../../data'
import { RouterModule } from '@angular/router'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'single-3-post-content',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgbTooltipModule,
  ],
  templateUrl: './post-content.component.html',
  styles: ``,
})
export class PostContentComponent implements AfterViewInit {
  commentForm!: FormGroup
  formSubmit!: boolean
  postComment: CommentType[] = commentsData
  mostPopular: MostPopularType[] = mostPopularArticle
  trendingPostData: TrendingType[] = trendingPost
  relevant = ['Nature', 'Inspiration', 'Travel', 'Psychology']
  socialICon = ['instagram', 'facebook', 'telegram', 'x']
  list = [
    'Quam laoreet eget id sapien',
    'Morbi convallis suspendisse',
    'Vivamus non ante',
    'Praesent dignissim efficitur',
    'Gravida a mi neque',
  ]
  tag = ['Inspiration', 'Travel', 'Books']

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.trendingPostData = trendingPost
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      comment: ['', Validators.required],
    })
  }

  ngAfterViewInit(): void {
    const selector = 'needs-validation'
    const forms = document.getElementsByClassName(selector)

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i] as HTMLFormElement
      form.addEventListener(
        'submit',
        (e) => {
          if (!form.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
          }
          form.classList.add('was-validated')
        },
        false
      )
    }
  }
  // get Form value
  get formValues() {
    return this.commentForm.controls
  }
  // on Submit
  onSubmit() {
    this.formSubmit = true
  }
}
