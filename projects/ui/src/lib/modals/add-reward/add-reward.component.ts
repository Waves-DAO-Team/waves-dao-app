import {Component, Inject} from '@angular/core'
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms'
import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {DIALOG_DATA, DialogParams} from '@ui/dialog/dialog.tokens'
import {ErrorStateMatcher} from '@angular/material/core'
import {EErrorReward} from '@ui/modals/add-reward/add-reward.interface'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState (control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}


@Component({
  selector: 'ui-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss']
})
export class AddRewardComponent {

  public eErrorType = EErrorReward
  public isInProcess = false
  private readonly numRegex = /^-?\d*[.,]?\d{0,2}$/
  public readonly grantForm = new FormGroup({
    reward: new FormControl('',
      [
        Validators.required,
        Validators.min(0.01),
        Validators.pattern(this.numRegex)
      ]
    )
  })
  public error: EErrorReward | null = null
  public matcher = new MyErrorStateMatcher()

  constructor (
    @Inject(DIALOG_DATA) public params: DialogParams, // eslint-disable-line
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface // eslint-disable-line
  ) {
    this.catcherError()
  }

  catcherError (): void {
    this.grantForm.valueChanges.subscribe(() => {
      this.error = null
      if (this.grantForm.controls.reward.getError(EErrorReward.pattern)) {
        this.error = EErrorReward.pattern
      } else if (this.grantForm.controls.reward.getError(EErrorReward.required)) {
        this.error = EErrorReward.required
      } else if (this.grantForm.controls.reward.getError(EErrorReward.min)) {
        this.error = EErrorReward.min
      }
    })
  }

  fixReward (reward: number | string): string {
    if (typeof reward === 'string') {reward = parseFloat(reward)}
    if (typeof reward === 'number') {reward = +reward.toFixed(2)}
    if (reward < 0 || !reward) {reward = 0}

    return (reward * 100000000).toString()
  }

  onSubmit (): void {
    if (this.params.submitCallBack) {
      this.isInProcess = true
      this.params.submitCallBack({
        
        reward: this.fixReward(this.grantForm.value.reward)
      })
    }
  }
}
