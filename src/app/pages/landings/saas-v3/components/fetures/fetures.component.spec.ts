import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FeturesComponent } from './fetures.component'

describe('FeturesComponent', () => {
  let component: FeturesComponent
  let fixture: ComponentFixture<FeturesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeturesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FeturesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
