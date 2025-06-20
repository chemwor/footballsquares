import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBar6Component } from './navigation-bar-6.component'

describe('NavigationBar6Component', () => {
  let component: NavigationBar6Component
  let fixture: ComponentFixture<NavigationBar6Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar6Component],
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationBar6Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
