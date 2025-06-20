import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MarketingAgencyComponent } from './marketing-agency.component'

describe('MarketingAgencyComponent', () => {
  let component: MarketingAgencyComponent
  let fixture: ComponentFixture<MarketingAgencyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingAgencyComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MarketingAgencyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
