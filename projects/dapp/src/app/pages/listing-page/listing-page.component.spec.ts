import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListingPageComponent } from './listing-page.component'
import { ContractService } from '@services/contract/contract.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { ListingModule } from '@ui/listing/listing.module'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('ListingPageComponent', () => {
  let component: ListingPageComponent
  let fixture: ComponentFixture<ListingPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ListingModule, MatSnackBarModule, getTranslocoModule()],
      declarations: [ListingPageComponent],
      providers: [
        provideAppConstants(),
        ContractService,
        provideApi()]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
