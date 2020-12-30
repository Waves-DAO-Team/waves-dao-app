import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "@services/user/user.service";
import {DIALOG_DATA, DialogParams} from "@ui/dialog/dialog.tokens";

@Component({
  selector: 'ui-submit-solution',
  templateUrl: './submit-solution.component.html',
  styleUrls: ['./submit-solution.component.scss']
})
export class SubmitSolutionComponent {

  isSubmit = false

  form = new FormGroup({
    solution: new FormControl('')
  })

  constructor (
    public userService: UserService,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) {}

  onSubmit () {
    if (this.params.submitCallBack) {
      this.params.submitCallBack({
        reward: this.form.value.solution
      })
    }
  }

}
