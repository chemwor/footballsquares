import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SalesValueComponent } from './sales-value.component'

describe('SalesValueComponent', () => {
  let component: SalesValueComponent
  let fixture: ComponentFixture<SalesValueComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesValueComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(SalesValueComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
