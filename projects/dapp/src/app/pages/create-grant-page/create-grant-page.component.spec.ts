import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateGrantPageComponent } from './create-grant-page.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ContractService } from '@services/contract/contract.service'
import { TranslocoModule } from '@ngneat/transloco'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'

describe('CreateGrantPageComponent', () => {
  let component: CreateGrantPageComponent
  let fixture: ComponentFixture<CreateGrantPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslocoModule, RouterTestingModule],
      declarations: [CreateGrantPageComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
      // providers: [{
      //   provide: ContractService,
      //   useValue: {
      //     addTask: (grantId: string, reward: string) => {}
      //   }
      // }]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGrantPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
