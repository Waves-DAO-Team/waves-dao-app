import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '@services/user/user.service';
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service';
import {DIALOG_DATA, DialogParams} from '@ui/dialog/dialog.tokens';

@Component({
  selector: 'ui-edit-grant',
  templateUrl: './edit-grant.component.html',
  styleUrls: ['./edit-grant.component.scss']
})
export class EditGrantComponent{
  grantForm = new FormGroup({
    name: new FormControl(''),
    reward: new FormControl('')
  })


  constructor (
    public userService: UserService,
    private disruptiveContractService: DisruptiveContractService,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) {
  }

  onSubmit () {
    // this.disruptiveContractService.addTask(this.grantForm.value.name, this.grantForm.value.link)
    if (this.params.submitCallBack){
      this.params.submitCallBack( {
        name: this.grantForm.value.name,
        link: this.grantForm.value.link
      })
    }

  }


}
