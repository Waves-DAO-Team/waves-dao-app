import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '../../../../services/src/interface'
import { ModalComponent } from '@ui/modal/modal.component'
import { SignerService } from '@services/signer/signer.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'
import { ContractService } from '@services/contract/contract.service'
import { ActivatedRoute } from '@angular/router'

import { LinkContentService } from '@services/link-content/link-content.service'

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

  constructor (
    private route: ActivatedRoute,
    public userService: UserService,
    private signerService: SignerService,
    private snackBar: MatSnackBar,
    public contractService: ContractService,
    public linkContentService: LinkContentService,
    public cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit (): void {
    if (this.grant?.link?.value) {
      // this.linkContentService.init(this.grant.link.value)

      this.linkContentService.link$.next(this.grant.link.value)
    }
  }

  vote (value: 'like' | 'dislike') {
    const id = this.grant.id || ''
    this.contractService.voteForTaskProposal(id, value)
  }





  voteTeam (voteValue: 'like' | 'dislike', teamIdentifier: string) {
    this.contractService.voteForApplicant(
      this.grant.id as string,
      teamIdentifier,
      voteValue
    )
  }





}
