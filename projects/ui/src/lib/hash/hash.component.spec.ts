import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HashComponent } from './hash.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {provideApi, provideAppConstants} from '@constants'
import {ContractProviderDefine} from '@services/contract/contract-provider-factory'
import {CONTRACT} from '@pages/about-page/about-page.provider'

describe('HashComponent', () => {
  let component: HashComponent
  let fixture: ComponentFixture<HashComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashComponent ],
      imports: [
        HttpClientTestingModule,
        getTranslocoModule(),
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        ContractProviderDefine(CONTRACT)
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HashComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
