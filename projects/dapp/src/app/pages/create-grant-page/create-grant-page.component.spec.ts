import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateGrantPageComponent } from './create-grant-page.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '../../transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'

describe('CreateGrantPageComponent', () => {
  let component: CreateGrantPageComponent
  let fixture: ComponentFixture<CreateGrantPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, getTranslocoModule(), RouterTestingModule, ReactiveFormsModule],
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
