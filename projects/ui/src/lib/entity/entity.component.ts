import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '../../../../services/src/interface'
import { ModalComponent } from '@ui/modal/modal.component'
import { ContractService } from '@services/contract/contract.service'
import { LinkContentService } from '@services/link-content/link-content.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  @Input() public readonly grant: ContractGrantModel = {}
  grantStatusEnum = GrantStatusEnum
  userRoleEnum = RoleEnum
  isDAOVote = false
  @ViewChild(ModalComponent) modal?: ModalComponent

  reportLink = '';
  mdText$ = this.linkContentService.mdText$.subscribe(() => {
    this.cdr.markForCheck()
  })

  modalStep = 1

  applyGrantForm = new FormGroup({
    team: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (
    public userService: UserService,
    public contractService: ContractService,
    public linkContentService: LinkContentService,
    public cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit (): void {
    if (this.grant?.link?.value) {
      this.linkContentService.link$.next(this.grant.link.value)
    }
    // setInterval(() => {
    //   console.log('--->',   this.signerService.signer.getBalance())
    //
    // }, 5000)
  }

  vote (value: 'like' | 'dislike') {
    const id = this.grant.id || ''
    this.contractService.voteForTaskProposal(id, value)
  }

  onSubmitApplyGrantForm (): void {
    /* eslint-disable no-unused-expressions */
    if (this.grant?.id && this.applyGrantForm?.value?.team && this.applyGrantForm?.value?.link) {
      this.contractService.applyForTask(this.grant?.id, this.applyGrantForm?.value?.team, this.applyGrantForm?.value?.link)
      this.modal?.onCancel()
    }
  }

  openApplyModal ($event: boolean): void {
    this.modal?.openModal()
    this.modalStep = 1
  }

  modalGoTo (com: 'ALREADY_APPLIED' | 'NEED_APPLY') {
    if (com === 'NEED_APPLY') {
      window.open('https://github.com/Waves-Association/grants-program/issues/new?assignees=KardanovIR&labels=Interhack+Grant&template=track-3--interhack-grant.md&title=%5BTrack+3.+Interhack+Grant%5D+', '_blank')
    }
    this.modalStep = 2
  }
}
