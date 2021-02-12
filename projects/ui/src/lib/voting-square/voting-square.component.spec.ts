import { ComponentFixture, TestBed } from '@angular/core/testing'
import { VotingSquareComponent } from './voting-square.component'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'

describe('VotingSquareComponent', () => {
  let component: VotingSquareComponent
  let fixture: ComponentFixture<VotingSquareComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingSquareComponent ],
      imports: [getTranslocoModule()]

    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingSquareComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
