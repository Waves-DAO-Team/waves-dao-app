import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core'
import { GrantStatusEnum } from '../../../../../services/src/interface'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { GrantsVariationType } from '@services/contract/contract.model'

@Component({
  selector: 'ui-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent implements OnInit {
  grantStatusEnum = GrantStatusEnum
  userRoleEnum = RoleEnum

  @Input() public contract!: GrantsVariationType
  @Input() public status: string | null = null
  @Input() public grantId: string | null = null
  @Input() public role: string | null = null
  @Input() public voted: string | null = null
  @Input() public performer: string | null = null
  @Output() public openApplyModal = new EventEmitter<boolean>()

  reportLink = ''

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) { }

  ngOnInit () {
  }

  finishVote () {
    this.disruptiveContractService.finishTaskProposalVoting(this.grantId as string)
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
}
