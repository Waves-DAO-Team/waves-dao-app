import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "@services/user/user.service";
import {DisruptiveContractService} from "@services/contract/disruptive-contract.service";
import {DIALOG_DATA, DialogParams} from "@ui/dialog/dialog.tokens";

@Component({
  selector: 'ui-add-task-details',
  templateUrl: './add-task-details.component.html',
  styleUrls: ['./add-task-details.component.scss']
})
export class AddTaskDetailsComponent  {

  taskDetailsForm = new FormGroup({
    reward: new FormControl('')
  })


  constructor (
    public userService: UserService,
    private disruptiveContractService: DisruptiveContractService,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) {
  }

  onSubmit () {
    if (this.params.submitCallBack){
      this.params.submitCallBack( {
        reward: (this.taskDetailsForm.value.reward * 100000000).toString(),
      })
    }

  }

}
