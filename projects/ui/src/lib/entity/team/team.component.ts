import { Component, Input, OnInit } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { ContractService } from '@services/contract/contract.service'
import { GrantStatusEnum } from '../../../../../services/src/interface'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'

@Component({
  selector: 'ui-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  grantStatusEnum = GrantStatusEnum
  @Input() grant: ContractGrantModel | null = null

  constructor (
      public userService: UserService,
      public disruptiveContractService: DisruptiveContractService) {
  }

  ngOnInit (): void {
  }

  voteTeam (voteValue: 'like' | 'dislike', teamIdentifier: string) {
    if (this.grant?.status?.value === this.grantStatusEnum.readyToApply) {
      this.disruptiveContractService.voteForApplicant(this.grant?.id as string, teamIdentifier, voteValue)
    }
  }
}