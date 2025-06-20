import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContactV2FormComponent } from './contact-v2-form.component'

describe('ContactV2FormComponent', () => {
  let component: ContactV2FormComponent
  let fixture: ComponentFixture<ContactV2FormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactV2FormComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ContactV2FormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
