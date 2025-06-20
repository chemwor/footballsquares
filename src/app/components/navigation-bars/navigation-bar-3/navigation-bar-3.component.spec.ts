import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBar3Component } from './navigation-bar-3.component'

describe('NavigationBar3Component', () => {
  let component: NavigationBar3Component
  let fixture: ComponentFixture<NavigationBar3Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar3Component],
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationBar3Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
