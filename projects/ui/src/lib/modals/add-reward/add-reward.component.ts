import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DisruptiveContractService} from "@services/contract/disruptive-contract.service";
import {CONTRACT} from "@pages/add-reward-page/add-reward-page.provider";
import {LoadingWrapperModel} from "@libs/loading-wrapper/loading-wrapper";
import {GrantsVariationType} from "@services/static/static.model";
import {APP_CONSTANTS, AppConstantsInterface} from "@constants";
import {take} from "rxjs/operators";
import {route} from "@libs/pipes/routes.lib";
import {DIALOG_DATA, DialogParams} from "@ui/dialog/dialog.tokens";

@Component({
  selector: 'ui-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.scss']
})
export class AddRewardComponent {

  isInProcess = false

  public readonly grantForm = new FormGroup({
    reward: new FormControl('', Validators.required)
  })

  constructor (
    @Inject(DIALOG_DATA) public params: DialogParams,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }


  onSubmit () {

    if (this.params.submitCallBack){
      this.isInProcess = true
      this.params.submitCallBack( {
        reward: (this.grantForm.value.reward * 100000000).toString()
      })
    }
  }
}
