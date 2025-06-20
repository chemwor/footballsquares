import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostComentComponent } from './post-coment.component'

describe('PostComentComponent', () => {
  let component: PostComentComponent
  let fixture: ComponentFixture<PostComentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PostComentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
