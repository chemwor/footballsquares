import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ServiceV3Component } from './service-v3.component'

describe('ServiceV3Component', () => {
  let component: ServiceV3Component
  let fixture: ComponentFixture<ServiceV3Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceV3Component],
    }).compileComponents()

    fixture = TestBed.createComponent(ServiceV3Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
