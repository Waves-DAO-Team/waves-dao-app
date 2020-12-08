import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import {
  ContractGrantModel,
  GrantsVariationType
} from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '../../../../services/src/interface'
import { LinkContentService } from '@services/link-content/link-content.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { take, takeUntil } from 'rxjs/operators'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'
import { Subject } from 'rxjs'
import { API, AppApiInterface } from '@constants'
import { DialogComponent } from '@ui/dialog/dialog.component'
import { FooterComponent } from '@ui/footer/footer.component'
import { MatDialog } from '@angular/material/dialog'
import { ApplyComponent } from '@ui/modals/apply/apply.component'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnInit, OnDestroy {
  @Input() public readonly grant: ContractGrantModel = {}

  @Input() public readonly contract!: GrantsVariationType

  public grantStatusEnum = GrantStatusEnum
  public userRoleEnum = RoleEnum
  public isDAOVote = false

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  @DestroyedSubject() private readonly destroyed$!: Subject<null>;

  reportLink = '';

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    public linkContentService: LinkContentService,
    public cdr: ChangeDetectorRef,
    @Inject(API) public readonly api: AppApiInterface
  ) {}

  ngOnInit (): void {
    if (this.grant?.link?.value) {
      this.linkContentService.link$.next(this.grant.link.value)
    }
  }

  vote (value: 'like' | 'dislike') {
    const id = this.grant.id || ''
    this.disruptiveContractService.voteForTaskProposal(id, value)
  }

  ngOnDestroy () {}
}
