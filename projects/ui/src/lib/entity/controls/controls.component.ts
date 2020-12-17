import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Inject, ChangeDetectorRef, Output, EventEmitter, TemplateRef
} from '@angular/core'
import {UserService} from '@services/user/user.service'
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service'
import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {
  GrantStatusEnum,
  GrantsVariationType
} from '@services/static/static.model'
import {MatDialog} from '@angular/material/dialog';
import {CommunityContractService} from '@services/contract/community-contract.service';

@Component({
  selector: 'ui-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent {
  grantStatusEnum = GrantStatusEnum
  // @ts-ignore
  @Input() controlsTemplate: TemplateRef<Component> | undefined;
  @Input() public contract!: GrantsVariationType
  @Input() public status: string | null = null
  @Input() public grantId: string | null = null
  @Input() public role: string | null = null
  @Input() public voted: string | null = null
  @Input() public performer: string | null = null

  @Output() newFinishVoteEvent = new EventEmitter()
  @Output() newStartWorkEvent = new EventEmitter()
  @Output() newRejectEvent = new EventEmitter()
  @Output() newAcceptWorkResultEvent = new EventEmitter<string>()
  @Output() newFinishApplicantsVoteEvent = new EventEmitter()
  @Output() newAddRewardEvent = new EventEmitter()
  @Output() newEditGrantEvent = new EventEmitter()

  reportLink = ''

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public communityContractService: CommunityContractService,
  ) {
  }

}
