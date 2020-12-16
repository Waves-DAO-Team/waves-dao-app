import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContractMenuComponent } from './contract-menu.component'
import {ActivatedRoute} from '@angular/router';
import {provideApi, provideAppConstants} from '@constants';

describe('ContractMenuComponent', () => {
  let component: ContractMenuComponent
  let fixture: ComponentFixture<ContractMenuComponent>
  const activatedRouteMock = {
    snapshot: {
      data: {
        importantData: {
          content: 'Really Important String'
        }
      }
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractMenuComponent],
      imports: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
      providers: [     provideApi(), provideAppConstants()

      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
