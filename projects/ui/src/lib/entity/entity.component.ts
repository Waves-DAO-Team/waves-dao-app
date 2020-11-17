import { Component, Input, OnInit, ViewChild } from '@angular/core'
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
import { tap } from 'rxjs/operators'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent {
  @Input() grant: ContractGrantModel = {}
  grantStatusEnum = GrantStatusEnum
  userRoleEnum = RoleEnum
  isDAOVote = false
  @ViewChild(ModalComponent) modal?: ModalComponent

  entityId: string = ''
  entityId$ = this.route.params
    .pipe(
      tap(
        (param) => {
          this.entityId = param.entityId
        }
      )
    ).subscribe()

  constructor (
    private route: ActivatedRoute,
    public userService: UserService,
    private signerService: SignerService,
    private snackBar: MatSnackBar,
    public contractService: ContractService,
  ) {
  }

  vote () {
    this.isDAOVote = true

    // this.contractService.voteForApplicant(
    //   '2WrSKBJj6fiYAUiDVDCccfjHmqHc1hpEsQzxuDGBNhxP',
    //   '3N1eyWNffhxPCmYBWBdnWbhmAVAVjkTEqY5',
    //   2
    // )
  }

  public signup (): void {
    this.signerService.login().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  finishVote() {
    this.contractService.finishApplicantsVoting(this.entityId)

  }
}
