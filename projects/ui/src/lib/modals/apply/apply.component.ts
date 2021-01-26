import { Component, Inject, OnInit } from '@angular/core'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { API, AppApiInterface } from '@constants'
import { ContractGrantModel } from '@services/contract/contract.model'
import { StaticService } from '@services/static/static.service'

@Component({
  selector: 'ui-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  modalStep: 1 | 2 | 3 = 1
  public readonly grant: ContractGrantModel = {}
  applyGrantForm = new FormGroup({
    team: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (
    public staticService: StaticService,
    public disruptiveContractService: DisruptiveContractService,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(DIALOG_DATA) public params: DialogParams) {
    if (params.grant) {
      this.grant = params.grant
    }
  }

  ngOnInit (): void {
  }

  closeModal () {
    this.params.dialogRef.close()
  }

  onSubmitApplyGrantForm (): void {
    if (this.grant?.id && this.applyGrantForm?.value?.team && this.applyGrantForm?.value?.link) {
      if (this.params.submitCallBack) {
        this.params.submitCallBack({
          id: this.grant?.id,
          team: this.applyGrantForm?.value?.team,
          link: this.applyGrantForm?.value?.link
        })
      }

      this.modalGoTo('CLOSE')
    }
  }

  modalGoTo (com: 'ALREADY_APPLIED' | 'NEED_APPLY' | 'CLOSE') {
    if (com === 'CLOSE') {
      this.modalStep = 3
    } else {
      if (com === 'NEED_APPLY') {
        window.open(this.api.issues[this.staticService.selectedContact], '_blank')
      }
      this.modalStep = 2
    }
  }
}
