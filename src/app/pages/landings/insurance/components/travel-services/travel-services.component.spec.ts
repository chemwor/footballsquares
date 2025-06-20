import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TravelServicesComponent } from './travel-services.component'

describe('TravelServicesComponent', () => {
  let component: TravelServicesComponent
  let fixture: ComponentFixture<TravelServicesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelServicesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TravelServicesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
