import {ComponentFixture, TestBed} from '@angular/core/testing'

import {HeaderComponent} from './header.component'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {PipesModule} from '@libs/pipes/pipes.module'
import {FlowTextModule} from '@ui/flow-text/flow-text.module'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {TagModule} from '@ui/tag/tag.module'
import {RouterTestingModule} from '@angular/router/testing'
import {ActivatedRoute} from '@angular/router'
import {of} from 'rxjs'
import {provideApi, provideAppConstants} from "@constants";

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule, getTranslocoModule(), PipesModule, FlowTextModule],
      declarations: [HeaderComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          imports: [HttpClientTestingModule, MatSnackBarModule, TagModule, getTranslocoModule(), RouterTestingModule],
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => null
            })
          }
        }]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
