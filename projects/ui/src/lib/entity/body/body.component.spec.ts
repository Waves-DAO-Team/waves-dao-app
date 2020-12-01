import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BodyComponent } from './body.component'
import { provideApi, provideAppConstants } from '@constants'
import { TranslocoModule } from '@ngneat/transloco'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown'

describe('BodyComponent', () => {
  let component: BodyComponent
  let fixture: ComponentFixture<BodyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), MarkdownModule],
      declarations: [BodyComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        MarkdownService, {
          provide: SECURITY_CONTEXT,
          useValue: 0
        }
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
