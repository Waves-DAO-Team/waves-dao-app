import {Component, Inject} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {UserService} from '@services/user/user.service'
import {DIALOG_DATA, DialogParams} from '@ui/dialog/dialog.tokens'
import {HashService} from '@services/hash/hash.service'

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
    public hashService: HashService,
    public userService: UserService,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) {
  }


  onSubmit (): void {
    this.params.dialogRef.close()
    const link = this.grantForm.controls.link.value
    this.hashService.init(link)  // eslint-disable-line @typescript-eslint/no-floating-promises
      .then((hash: string = '') => {
        if (this.params.submitCallBack) {
          this.params.submitCallBack({
            name: this.grantForm.controls.name.value,
            link: this.grantForm.controls.link.value,
            hash
          })
        }
      })
  }

}
