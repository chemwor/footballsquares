import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ServiceV1Component } from './service-v1.component'

describe('ServiceV1Component', () => {
  let component: ServiceV1Component
  let fixture: ComponentFixture<ServiceV1Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceV1Component],
    }).compileComponents()

    fixture = TestBed.createComponent(ServiceV1Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
