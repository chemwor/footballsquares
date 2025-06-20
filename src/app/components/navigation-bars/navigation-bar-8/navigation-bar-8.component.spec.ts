import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBar8Component } from './navigation-bar-8.component'

describe('NavigationBar8Component', () => {
  let component: NavigationBar8Component
  let fixture: ComponentFixture<NavigationBar8Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar8Component],
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationBar8Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
