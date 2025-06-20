import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Error2404Component } from './error2404.component'

describe('Error2404Component', () => {
  let component: Error2404Component
  let fixture: ComponentFixture<Error2404Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error2404Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Error2404Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
