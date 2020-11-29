import {Component, Input, OnInit, Output} from '@angular/core';
import {GrantStatusEnum} from "../../../../../services/src/interface";
import {UserService} from "@services/user/user.service";
import {ContractService} from "@services/contract/contract.service";
import {RoleEnum} from "@services/user/user.interface";
import {translate} from "@ngneat/transloco";
import {SignerService} from "@services/signer/signer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
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

  constructor(
    public userService: UserService,
    public contractService: ContractService,
    private signerService: SignerService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {}

  finishVote () {
    this.contractService.finishTaskProposalVoting(this.grantId as string)
  }

  signup () {
    this.signerService.login().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  startWork () {
    this.contractService.startWork(this.grantId as string)
  }

  reject () {
    this.contractService.rejectTask(this.grantId as string)
  }

  acceptWorkResult () {
    this.contractService.acceptWorkResult(this.grantId as string, this.reportLink)
  }

  finishApplicantsVote () {
    this.contractService.finishApplicantsVoting(this.grantId as string)
  }

  onOpenApplyModal() {
    this.openApplyModal.emit(true)
  }

}
