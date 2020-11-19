import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditGrantPageComponent } from './edit-grant-page.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { ContractService } from '@services/contract/contract.service'
import { TranslocoModule } from '@ngneat/transloco'
import { provideApi, provideAppConstants } from '@constants'

describe('EditGrantPageComponent', () => {
  let component: EditGrantPageComponent
  let fixture: ComponentFixture<EditGrantPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, TranslocoModule],
      declarations: [EditGrantPageComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrantPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
