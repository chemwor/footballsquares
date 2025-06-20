import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BusinessConsultingComponent } from './business-consulting.component'

describe('BusinessConsultingComponent', () => {
  let component: BusinessConsultingComponent
  let fixture: ComponentFixture<BusinessConsultingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessConsultingComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BusinessConsultingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
