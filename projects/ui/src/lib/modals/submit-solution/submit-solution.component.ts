import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@services/user/user.service'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'
import {HashService} from "@services/hash/hash.service";

@Component({
  selector: 'ui-submit-solution',
  templateUrl: './submit-solution.component.html',
  styleUrls: ['./submit-solution.component.scss']
})
export class SubmitSolutionComponent {
  isSubmit = false

  public form: FormGroup = new FormGroup({
    solution: new FormControl('')
  })

  constructor (
    public hashService: HashService,
    public userService: UserService,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) {}

  onSubmit (): void {
    const value = this.form.get('solution')?.value
    if (this.params.submitCallBack) {
      this.hashService.init(this.form.controls['solution'].value).then((hash: string = '') => {
        if (this.params.submitCallBack) {
          this.params.submitCallBack({
            solutionLink: typeof value === 'string' ? value : '' as string,
            hash: hash
          })
        }
      })
    }
  }
}
