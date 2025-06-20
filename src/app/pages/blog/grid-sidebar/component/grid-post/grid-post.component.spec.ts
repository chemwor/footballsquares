import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GridPostComponent } from './grid-post.component'

describe('GridPostComponent', () => {
  let component: GridPostComponent
  let fixture: ComponentFixture<GridPostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridPostComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GridPostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
