import { ComponentFixture, TestBed } from '@angular/core/testing'

import { YogaStudioComponent } from './yoga-studio.component'

describe('YogaStudioComponent', () => {
  let component: YogaStudioComponent
  let fixture: ComponentFixture<YogaStudioComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YogaStudioComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(YogaStudioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
