import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { API, AppApiInterface } from '@constants'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'

@Component({
  selector: 'ui-add-membership-working-group',
  templateUrl: './add-membership-working-group.component.html',
  styleUrls: ['./add-membership-working-group.component.scss']
})
export class DaoMembershipAddMembershipWorkingGroupComponent {
  public readonly form = new FormGroup({
    address: new FormControl('', Validators.required)
  })

  constructor (
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) { }

  onSubmit (): void {
    if (this.params.submitCallBack && this?.form?.value?.address) {
      this.params.submitCallBack({
        address: this.form.value.address
      })
    }
  }

  closeModal (): void {
    this.params.dialogRef.close()
  }
}
