import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '@services/user/user.service'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'

@Component({
  selector: 'ui-propose-grant',
  templateUrl: './propose-grant.component.html',
  styleUrls: ['./propose-grant.component.scss']
})
export class ProposeGrantComponent {
  public readonly grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (
    public userService: UserService,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) {
  }

  onSubmit (): void {
    this.params.dialogRef.close()

    if (this.params.submitCallBack) {
      this.params.submitCallBack(this.grantForm.getRawValue())
    }
  }
}
