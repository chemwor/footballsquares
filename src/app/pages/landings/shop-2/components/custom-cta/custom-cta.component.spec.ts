import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CustomCtaComponent } from './custom-cta.component'

describe('CustomCtaComponent', () => {
  let component: CustomCtaComponent
  let fixture: ComponentFixture<CustomCtaComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCtaComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CustomCtaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
