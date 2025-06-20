import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WebStudioComponent } from './web-studio.component'

describe('WebStudioComponent', () => {
  let component: WebStudioComponent
  let fixture: ComponentFixture<WebStudioComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebStudioComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(WebStudioComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
