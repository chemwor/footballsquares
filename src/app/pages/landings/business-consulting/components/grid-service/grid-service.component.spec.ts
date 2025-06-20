import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GridServiceComponent } from './grid-service.component'

describe('GridServiceComponent', () => {
  let component: GridServiceComponent
  let fixture: ComponentFixture<GridServiceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridServiceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GridServiceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
