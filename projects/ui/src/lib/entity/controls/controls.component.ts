import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core'
import { GrantStatusEnum } from '../../../../../services/src/interface'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { translate } from '@ngneat/transloco'
import { SignerService } from '@services/signer/signer.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'ui-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent implements OnInit {
  grantStatusEnum = GrantStatusEnum
  userRoleEnum = RoleEnum

  @Input() status: string | null = null
  @Input() grantId: string | null = null
  @Input() role: string | null = null
  @Input() voted: string | null = null
  @Input() performer: string | null = null
  @Output() openApplyModal = new EventEmitter<boolean>()

  reportLink = ''

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    private signerService: SignerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit () {
  }

  finishVote () {
    this.disruptiveContractService.finishTaskProposalVoting(this.grantId as string)
  }

  signup () {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {}, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

  startWork () {
    this.disruptiveContractService.startWork(this.grantId as string)
  }

  reject () {
    this.disruptiveContractService.rejectTask(this.grantId as string)
  }

  acceptWorkResult () {
    this.disruptiveContractService.acceptWorkResult(this.grantId as string, this.reportLink)
  }

  finishApplicantsVote () {
    this.disruptiveContractService.finishApplicantsVoting(this.grantId as string)
  }

  onOpenApplyModal () {
    this.openApplyModal.emit(true)
  }
}
