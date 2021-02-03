import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@services/user/user.service'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'

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
    public userService: UserService, // eslint-disable-line
    @Inject(DIALOG_DATA) public params: DialogParams // eslint-disable-line
  ) {}

  onSubmit (): void {
    const value = this.form.get('solution')?.value

    if (this.params.submitCallBack) {
      this.params.submitCallBack({
        solutionLink: typeof value === 'string' ? value : '' as string
      })
    }
  }
}
