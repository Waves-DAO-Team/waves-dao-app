/* eslint-disable @typescript-eslint/restrict-plus-operands */

import {ChangeDetectorRef, Component, Inject, Input} from '@angular/core'
import {GrantsVariationType} from '@services/static/static.model'
import {
  ContractDataRawModel, ContractMemberRawData,
  DAOMembershipNamespace
} from '@services/contract/contract.model'
import {combineLatest, Observable} from 'rxjs'
import {ContractService} from '@services/contract/contract.service'
import {filter, map} from 'rxjs/operators'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'
import {RequestModel} from '@services/request/request.model'
import {DomSanitizer} from '@angular/platform-browser'
import {DialogComponent} from '@ui/dialog/dialog.component'
import {translate} from '@ngneat/transloco'
import {SubmitCallBackAddMemberArg} from '@ui/dialog/dialog.tokens'
import {StaticService} from '@services/static/static.service'
import {MatDialog} from '@angular/material/dialog'
import {CommunityContractService} from '@services/contract/community-contract.service'
import {DaoMembershipContractService} from '@services/contract/dao-membership-contract.service'
import {DaoMembershipAddMemberComponent} from '@ui/modals/dao-membership/add-member/add-member.component'
import {DaoMembershipProposeMemberComponent} from '@ui/modals/dao-membership/propose-member/propose-member.component'
import {DaoMembershipRejectMemberComponent} from '@ui/modals/dao-membership/reject-member/reject-member.component'
import {DaoMembershipAddWorkingGroupComponent} from '@ui/modals/dao-membership/add-working-group/add-working-group.component'
// eslint-disable-next-line
import {DaoMembershipAddMembershipWorkingGroupComponent} from '@ui/modals/dao-membership/add-membership-working-group/add-membership-working-group.component'
import {UserService} from '@services/user/user.service'
import {Location} from '@angular/common'

@Component({
  selector: 'app-dao-membership-template',
  templateUrl: './daoMembership-template.component.html',
  styleUrls: ['./daoMembership-template.component.scss']
})
export class DaoMembershipTemplateComponent {

  @Input() public readonly contract!: GrantsVariationType

  member$: Observable<DAOMembershipNamespace.MemberInterface[]> =  combineLatest([this.userService.stream$, this.contractService.stream])

    .pipe(
      filter(([user, stream]) => stream?.status === 'complete'),
      map(([user, stream]) => {

        const members = stream?.payload?.dao?.member
        const res: DAOMembershipNamespace.MemberInterface[] = []

        if (members) {
          Object.keys(members).map((key) => {
            if (members) {
              const member: ContractMemberRawData = members[key] as unknown as ContractMemberRawData
              let isCanVote = true

              if(
                !user.userAddress
                || (member?.votes && Object.keys(member?.votes).includes(user.userAddress))
                || user.userAddress === stream.payload.address
              ) {
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
      filter(data => data?.status === 'complete'),
      map((dataIn: RequestModel<ContractDataRawModel>) => {

        const res: DAOMembershipNamespace.WGInterface[] = []

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
      filter(data => data?.status === 'complete'),
      map((dataIn: RequestModel<ContractDataRawModel>) => {

        const res: DAOMembershipNamespace.WGInterface[] = []

        dataIn?.payload?.dao?.wg?.members.value.split(';').filter(e => e.length > 0).forEach(e => {
          res.push({
            address: e
          })
        })

        return res
      })
    )

  isManager$ = combineLatest([this.userService.stream$, this.contractService.stream])
    .pipe(
      filter(([user, stream]) => stream?.status === 'complete'),
      map(([user, stream]) => user.userAddress === stream.payload.address)
    )

  constructor (
    private readonly contractService: ContractService,
    public domSanitizer: DomSanitizer,
    @Inject(API) public readonly api: AppApiInterface,
    public staticService: StaticService,
    private daoMembershipContractService: DaoMembershipContractService,
    private readonly dialog: MatDialog,
    public communityContractService: CommunityContractService,
    private readonly location: Location, // eslint-disable-line
    private readonly cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private readonly userService: UserService, // eslint-disable-line
  ) {
  }

  onAddMember (): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipAddMemberComponent,
        params: {
          title: translate('modal.texts.add_member'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.addMember(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  onProposeMember (): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipProposeMemberComponent,
        params: {
          title: translate('modal.texts.propose_member'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.proposeMember(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  onRejectMember (): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipRejectMemberComponent,
        params: {
          title: translate('modal.texts.reject_member'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.rejectMember(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  vote (address: string, voteValue: 'like' | 'dislike'): void {
    this.daoMembershipContractService.voteForDAOMember(address, voteValue).subscribe()
  }

  onAddWorkingGroup (): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipAddWorkingGroupComponent,
        params: {
          title: translate('modal.texts.add_working_group'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.addWorkingGroup(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }

  goBack (): void {
    this.location.back()
  }

  onAddMembershipWorkingGroup (): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: DaoMembershipAddMembershipWorkingGroupComponent,
        params: {
          title: translate('modal.texts.add_membership_working_group'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.daoMembershipContractService.addMembershipWorkingGroup(data.address).subscribe()
            dialog.close()
          }
        }
      }
    })
  }
}
