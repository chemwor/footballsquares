import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationBar2Component } from './navigation-bar-2.component'

describe('NavigationBar2Component', () => {
  let component: NavigationBar2Component
  let fixture: ComponentFixture<NavigationBar2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationBar2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(NavigationBar2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
