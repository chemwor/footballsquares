import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ComingSoon2Component } from './coming-soon2.component'

describe('ComingSoon2Component', () => {
  let component: ComingSoon2Component
  let fixture: ComponentFixture<ComingSoon2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComingSoon2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(ComingSoon2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
