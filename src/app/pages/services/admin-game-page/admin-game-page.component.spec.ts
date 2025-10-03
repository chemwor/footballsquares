import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AdminGamePageComponent } from './admin-game-page.component'

describe('ServiceV3Component', () => {
  let component: AdminGamePageComponent
  let fixture: ComponentFixture<AdminGamePageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGamePageComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AdminGamePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
