import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'

@Component({
  selector: 'ui-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss']
})
export class AddRewardComponent {
  isInProcess = false

  public readonly grantForm = new FormGroup({
    reward: new FormControl('', Validators.required)
  })

  constructor (
    @Inject(DIALOG_DATA) public params: DialogParams, // eslint-disable-line
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface // eslint-disable-line
  ) {
  }

  onSubmit (): void {
    if (this.params.submitCallBack) {
      this.isInProcess = true
      this.params.submitCallBack({
        reward: (this.grantForm.value.reward * 100000000).toString()
      })
    }
  }
}
