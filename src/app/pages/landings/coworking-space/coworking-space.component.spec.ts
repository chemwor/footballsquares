import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CoworkingSpaceComponent } from './coworking-space.component'

describe('CoworkingSpaceComponent', () => {
  let component: CoworkingSpaceComponent
  let fixture: ComponentFixture<CoworkingSpaceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoworkingSpaceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CoworkingSpaceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
