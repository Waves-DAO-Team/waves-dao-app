/* eslint-disable @typescript-eslint/restrict-plus-operands */

import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core'
import {GrantsVariationType} from '@services/static/static.model'
import {
  ContractDataRawModel, ContractMemberRawData,
  DAOMembershipNamespace,
  IVotings
} from '@services/contract/contract.model'
import {combineLatest, Observable} from 'rxjs'
import {ContractService} from '@services/contract/contract.service'
import {filter, map, tap} from 'rxjs/operators'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'
import {RequestModel} from '@services/request/request.model'
import {DomSanitizer} from '@angular/platform-browser'
import {DialogComponent} from '@ui/dialog/dialog.component'
import {translate} from '@ngneat/transloco'
import {SubmitCallBackAddMemberArg, SubmitCallBackAddProposalArg} from '@ui/dialog/dialog.tokens'
import {StaticService} from '@services/static/static.service'
import {MatDialog} from '@angular/material/dialog'
import {CommunityContractService} from '@services/contract/community-contract.service'
import {AddProposalComponent} from '@ui/modals/add-proposal/add-proposal.component'
import {DaoMembershipContractService} from "@services/contract/dao-membership-contract.service";
import {DaoMembershipAddMemberComponent} from "@ui/modals/dao-membership/add-member/add-member.component";
import {DaoMembershipProposeMemberComponent} from "@ui/modals/dao-membership/propose-member/propose-member.component";
import {DaoMembershipRejectMemberComponent} from "@ui/modals/dao-membership/reject-member/reject-member.component";
import {DaoMembershipAddWorkingGroupComponent} from "@ui/modals/dao-membership/add-working-group/add-working-group.component";
import {DaoMembershipAddMembershipWorkingGroupComponent} from "@ui/modals/dao-membership/add-membership-working-group/add-membership-working-group.component";
import {UserService} from "@services/user/user.service";

@Component({
  selector: 'app-daoMembership-template',
  templateUrl: './daoMembership-template.component.html',
  styleUrls: ['./daoMembership-template.component.scss']
})
export class DaoMembershipTemplateComponent {

  @Input() public readonly contract!: GrantsVariationType

  member$: Observable<DAOMembershipNamespace.MemberInterface[]> =  combineLatest([this.userService.stream$, this.contractService.stream])

    .pipe(
      filter(([user, stream]) => stream?.status === "complete"),
      map(([user, stream]) => {

        let members = stream?.payload?.dao?.member
        let res: DAOMembershipNamespace.MemberInterface[] = []

        if (members) {
          Object.keys(members).map((key) => {
            if (members) {
              const member: ContractMemberRawData = members[key] as unknown as ContractMemberRawData
              let isCanVote = true
              if(!user.userAddress || (member?.votes && Object.keys(member?.votes).includes(user.userAddress))) {
                isCanVote = false
              }
              res.push(
                {
                  address: key,
                  vote: member?.vote?.value,
                  status: member?.status?.value,
                  isCanVote
                }
              )
            }
          })
        }

        return res
      })
    )

  mwg$: Observable<DAOMembershipNamespace.WGInterface[]> = this.contractService.stream
    .pipe(
      filter(data => data?.status === "complete"),
      map((dataIn: RequestModel<ContractDataRawModel>) => {

        let res: DAOMembershipNamespace.WGInterface[] = []

        dataIn?.payload?.dao?.mwg?.members.value.split(';').filter(e => e.length > 0).forEach(e => {
          res.push({
            address: e
          })
        })

        return res
      })
    )

  wg$: Observable<DAOMembershipNamespace.WGInterface[]> = this.contractService.stream
    .pipe(
      filter(data => data?.status === "complete"),
      map((dataIn: RequestModel<ContractDataRawModel>) => {

        let res: DAOMembershipNamespace.WGInterface[] = []

        dataIn?.payload?.dao?.wg?.members.value.split(';').filter(e => e.length > 0).forEach(e => {
          res.push({
            address: e
          })
        })

        return res
      })
    )

  constructor(
    private readonly contractService: ContractService,
    public domSanitizer: DomSanitizer,
    @Inject(API) public readonly api: AppApiInterface,
    public staticService: StaticService,
    private daoMembershipContractService: DaoMembershipContractService,
    private readonly dialog: MatDialog,
    public communityContractService: CommunityContractService,
    private readonly cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private readonly userService: UserService, // eslint-disable-line
  ) {
  }

  onAddMember(): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipAddMemberComponent,
        params: {
          // TODO: title
          title: translate('modal.texts.propose_special_voting'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.addMember(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  onProposeMember(): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipProposeMemberComponent,
        params: {
          // TODO: title
          title: translate('modal.texts.propose_special_voting'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.proposeMember(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  onRejectMember(): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipRejectMemberComponent,
        params: {
          // TODO: title
          title: translate('modal.texts.propose_special_voting'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.rejectMember(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  vote(address: string, voteValue: "like" | "dislike"): void {
    this.daoMembershipContractService.voteForDAOMember(address, voteValue).subscribe()
  }

  onAddWorkingGroup(): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipAddWorkingGroupComponent,
        params: {
          // TODO: title
          title: translate('modal.texts.propose_special_voting'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.addWorkingGroup(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  onAddMembershipWorkingGroup(): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipAddMembershipWorkingGroupComponent,
        params: {
          // TODO: title
          title: translate('modal.texts.propose_special_voting'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.addMembershipWorkingGroup(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }
}
