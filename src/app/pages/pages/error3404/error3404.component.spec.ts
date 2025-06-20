import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Error3404Component } from './error3404.component'

describe('Error3404Component', () => {
  let component: Error3404Component
  let fixture: ComponentFixture<Error3404Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error3404Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Error3404Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
