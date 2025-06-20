import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RelavantProductComponent } from './relavant-product.component'

describe('RelavantProductComponent', () => {
  let component: RelavantProductComponent
  let fixture: ComponentFixture<RelavantProductComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelavantProductComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RelavantProductComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
