import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CompleteGamesComponent } from './complete-games.component'

describe('ListComponent', () => {
  let component: CompleteGamesComponent
  let fixture: ComponentFixture<CompleteGamesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteGamesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CompleteGamesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
