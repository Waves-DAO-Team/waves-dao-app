import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Web3TemplateComponent } from './web3-template.component'
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ListingModule } from '@ui/listing/listing.module'
import {PipesModule} from "@libs/pipes/pipes.module";

describe('Web3TemplateComponent', () => {
  let component: Web3TemplateComponent
  let fixture: ComponentFixture<Web3TemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, PipesModule, getTranslocoModule(), RouterTestingModule, MatSnackBarModule, ListingModule],
      declarations: [Web3TemplateComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(Web3TemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
