import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@services/user/user.service'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'

@Component({
  selector: 'ui-add-task-details',
  templateUrl: './add-task-details.component.html',
  styleUrls: ['./add-task-details.component.scss']
})
export class AddTaskDetailsComponent {
  isSubmit = false

  taskDetailsForm = new FormGroup({
    reward: new FormControl('')
  })

  constructor (
    public userService: UserService,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) {}

  onSubmit (): void {
    if (this.params.submitCallBack) {
      this.params.submitCallBack({
        reward: ((this.taskDetailsForm?.value?.reward || 0) * 100000000).toString()
      })
    }
  }
}
