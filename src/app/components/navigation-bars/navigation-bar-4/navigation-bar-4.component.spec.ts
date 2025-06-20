import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBar4Component } from './navigation-bar-4.component'

describe('NavigationBar4Component', () => {
  let component: NavigationBar4Component
  let fixture: ComponentFixture<NavigationBar4Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar4Component],
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationBar4Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
