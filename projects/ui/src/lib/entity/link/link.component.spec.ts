import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LinkComponent } from './link.component'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown'

describe('BodyComponent', () => {
  let component: LinkComponent
  let fixture: ComponentFixture<LinkComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), MarkdownModule],
      declarations: [LinkComponent],
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
    fixture = TestBed.createComponent(LinkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
