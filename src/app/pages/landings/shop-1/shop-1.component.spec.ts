import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Shop1Component } from './shop-1.component'

describe('Shop1Component', () => {
  let component: Shop1Component
  let fixture: ComponentFixture<Shop1Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop1Component],
    }).compileComponents()

    fixture = TestBed.createComponent(Shop1Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
