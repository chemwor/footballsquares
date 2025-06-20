import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FeaturePostComponent } from './feature-post.component'

describe('FeaturePostComponent', () => {
  let component: FeaturePostComponent
  let fixture: ComponentFixture<FeaturePostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturePostComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FeaturePostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
