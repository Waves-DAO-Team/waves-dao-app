import { Component, Inject, OnInit } from '@angular/core'
import { DIALOG_DATA, DialogParams } from '@ui/dialog/dialog.tokens'
import { take } from 'rxjs/operators'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { API, AppApiInterface } from '@constants'
import { ContractGrantModel } from '@services/contract/contract.model'

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
      this.disruptiveContractService.applyForTask(this.grant?.id, this.applyGrantForm?.value?.team, this.applyGrantForm?.value?.link)
        .pipe(take(1))
        .subscribe((data) => {
          this.modalStep = 3
          // this.cdr.markForCheck()
        }, () => {
          this.modalStep = 3
          // this.cdr.markForCheck()
        })
      this.modalGoTo('CLOSE')
    }
  }

  modalGoTo (com: 'ALREADY_APPLIED' | 'NEED_APPLY' | 'CLOSE') {
    if (com === 'CLOSE') {
      this.modalStep = 3
    } else {
      if (com === 'NEED_APPLY') {
        window.open('https://github.com/Waves-Association/grants-program/issues/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+', '_blank')
      }
      this.modalStep = 2
    }
  }
}
