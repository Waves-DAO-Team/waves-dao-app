import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListingPageComponent } from './listing-page.component'
import { ContractService } from '@services/contract/contract.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi } from '@constants'

describe('ListingPageComponent', () => {
  let component: ListingPageComponent
  let fixture: ComponentFixture<ListingPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListingPageComponent],
      providers: [ContractService, provideApi()]
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
