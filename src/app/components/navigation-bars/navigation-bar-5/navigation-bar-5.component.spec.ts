import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBar5Component } from './navigation-bar-5.component'

describe('NavigationBar5Component', () => {
  let component: NavigationBar5Component
  let fixture: ComponentFixture<NavigationBar5Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar5Component],
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationBar5Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
