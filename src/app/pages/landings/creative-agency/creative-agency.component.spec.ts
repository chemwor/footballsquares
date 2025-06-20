import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreativeAgencyComponent } from './creative-agency.component'

describe('CreativeAgencyComponent', () => {
  let component: CreativeAgencyComponent
  let fixture: ComponentFixture<CreativeAgencyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeAgencyComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CreativeAgencyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
