import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FavouriteItemsComponent } from './favourite-items.component'

describe('FavouriteItemsComponent', () => {
  let component: FavouriteItemsComponent
  let fixture: ComponentFixture<FavouriteItemsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteItemsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FavouriteItemsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
