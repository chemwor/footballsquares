import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ServiceV2Component } from './service-v2.component'

describe('ServiceV2Component', () => {
  let component: ServiceV2Component
  let fixture: ComponentFixture<ServiceV2Component>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceV2Component],
    }).compileComponents()

    fixture = TestBed.createComponent(ServiceV2Component)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
