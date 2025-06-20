import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SingleV3Component } from './single-v3.component'

describe('SingleV3Component', () => {
  let component: SingleV3Component
  let fixture: ComponentFixture<SingleV3Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleV3Component],
    }).compileComponents()

    fixture = TestBed.createComponent(SingleV3Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
