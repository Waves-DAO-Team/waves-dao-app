import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListingComponent } from './listing.component'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ContractService } from '@services/contract/contract.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TagModule } from '@ui/tag/tag.module'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('ListingComponent', () => {
  let component: ListingComponent
  let fixture: ComponentFixture<ListingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, TagModule, getTranslocoModule(), RouterTestingModule],
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
