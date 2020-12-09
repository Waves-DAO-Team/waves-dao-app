import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "@services/user/user.service";
import {AppApiInterface} from "@constants";
import {DIALOG_DATA, DialogParams} from "@ui/dialog/dialog.tokens";

@Component({
  selector: 'ui-propose-grant',
  templateUrl: './propose-grant.component.html',
  styleUrls: ['./propose-grant.component.scss']
})
export class ProposeGrantComponent implements OnInit {

  public readonly grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor(public userService: UserService, @Inject(DIALOG_DATA) public params: DialogParams) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.params.contractService){
      this.params.contractService.addTask(this.grantForm.value.name, this.grantForm.value.link)
    }
  }
}
