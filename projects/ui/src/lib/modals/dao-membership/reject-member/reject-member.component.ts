import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { API, AppApiInterface } from '@constants'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'

@Component({
  selector: 'ui-reject-member',
  templateUrl: './reject-member.component.html',
  styleUrls: ['./reject-member.component.scss']
})
export class DaoMembershipRejectMemberComponent {
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
