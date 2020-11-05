import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListingComponent } from './listing.component'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ContractService } from '@services/contract/contract.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('ListingComponent', () => {
  let component: ListingComponent
  let fixture: ComponentFixture<ListingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ListingComponent],
      providers: [
        provideAppConstants(),
        ContractService,
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
