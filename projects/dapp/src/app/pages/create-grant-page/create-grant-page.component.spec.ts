import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateGrantPageComponent } from './create-grant-page.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '../../transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { CONTRACT } from './create-grant-page.provider'

describe('CreateGrantPageComponent', () => {
  let component: CreateGrantPageComponent
  let fixture: ComponentFixture<CreateGrantPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, getTranslocoModule(), RouterTestingModule, ReactiveFormsModule, MatSnackBarModule],
      declarations: [CreateGrantPageComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        ContractProviderDefine(CONTRACT)
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
