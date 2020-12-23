import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {API, AppApiInterface} from "@constants";
import {DIALOG_DATA, DialogParams} from "@ui/dialog/dialog.tokens";

@Component({
  selector: 'ui-accept-work-result',
  templateUrl: './accept-work-result.component.html',
  styleUrls: ['./accept-work-result.component.scss']
})
export class AcceptWorkResultComponent {

  public readonly form = new FormGroup({
    reportLink: new FormControl('', Validators.required)
  })

  constructor(
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) { }


  onSubmit () {
    if (this.params.submitCallBack){
      this.params.submitCallBack( {
        reportLink: this.form.value.reportLink
      })
    }
  }

}
