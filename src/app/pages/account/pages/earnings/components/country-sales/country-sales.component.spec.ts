import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CountrySalesComponent } from './country-sales.component'

describe('CountrySalesComponent', () => {
  let component: CountrySalesComponent
  let fixture: ComponentFixture<CountrySalesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySalesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CountrySalesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
