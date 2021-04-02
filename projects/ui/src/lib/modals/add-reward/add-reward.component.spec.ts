import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddRewardComponent } from './add-reward.component'
import { provideApi, provideAppConstants } from '@constants'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {RewardModule} from '@libs/directives/reward.module'
import {MatButtonModule} from '@angular/material/button'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'

describe('AddRewardComponent', () => {
  let component: AddRewardComponent
  let fixture: ComponentFixture<AddRewardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        RewardModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ],
      declarations: [AddRewardComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRewardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should give the correct reward', () => {
    const testData: {in: string | number, out: string}[] = [
      {in: '2', out: '200000000'},
      {in: 2, out: '200000000'},
      {in: '0', out: '0'},
      {in: 0, out: '0'},
      {in: -10, out: '0'},
      {in: '-10', out: '0'},
      {in: 'bam bam', out: '0'},
      {in: '10 10', out: '1000000000'},
      {in: '10,10', out: '1000000000'},
      {in: '10.10', out: '1010000000'},
      {in: '10-10', out: '1000000000'},
      {in: 0.00002, out: '0'},
      {in: '0.00002', out: '0'},
    ]
    testData.forEach( d => {
      expect(component.fixReward(d.in)).toBe(d.out)
    })
  })
})
