import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '../../../../services/src/interface'
import { ModalComponent } from '@ui/modal/modal.component'
import { LinkContentService } from '@services/link-content/link-content.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { takeUntil } from 'rxjs/operators'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'
import { Subject } from 'rxjs'
import {API, AppApiInterface} from "@constants";

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnInit, OnDestroy {
  @Input() public readonly grant: ContractGrantModel = {}
  public readonly grantStatusEnum = GrantStatusEnum
  public readonly userRoleEnum = RoleEnum
  public readonly isDAOVote = false
  @ViewChild(ModalComponent) public readonly modal?: ModalComponent

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  @DestroyedSubject() private readonly destroyed$!: Subject<null>;

  reportLink = '';
  mdText$ = this.linkContentService.mdText$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(() => {
      this.cdr.markForCheck()
    })

  modalStep: 1 | 2 | 3 = 1

  applyGrantForm = new FormGroup({
    team: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    public linkContentService: LinkContentService,
    public cdr: ChangeDetectorRef,
    @Inject(API) public readonly api: AppApiInterface,
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

  onSubmitApplyGrantForm (): void {
    /* eslint-disable no-unused-expressions */
    if (this.grant?.id && this.applyGrantForm?.value?.team && this.applyGrantForm?.value?.link) {
      this.disruptiveContractService.applyForTask(this.grant?.id, this.applyGrantForm?.value?.team, this.applyGrantForm?.value?.link)
      // this.modal?.onCancel()
      this.modalGoTo('CLOSE')
    }
  }

  openApplyModal ($event: boolean): void {
    this.modal?.openModal()
    this.modalStep = 1
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

  ngOnDestroy () {}
}
