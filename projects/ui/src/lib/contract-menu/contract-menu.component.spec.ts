import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContractMenuComponent } from './contract-menu.component'

describe('ContractMenuComponent', () => {
  let component: ContractMenuComponent
  let fixture: ComponentFixture<ContractMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractMenuComponent]
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
