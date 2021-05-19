/* eslint-disable @typescript-eslint/restrict-plus-operands */

import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core'
import {GrantsVariationType} from '@services/static/static.model'
import {ContractDataRawModel, DAOMembershipNamespace, IVotings} from '@services/contract/contract.model'
import {Observable} from 'rxjs'
import {ContractService} from '@services/contract/contract.service'
import {filter, map, tap} from 'rxjs/operators'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'
import {RequestModel} from '@services/request/request.model'
import {DomSanitizer} from '@angular/platform-browser'
import {DialogComponent} from '@ui/dialog/dialog.component'
import {translate} from '@ngneat/transloco'
import {SubmitCallBackAddProposalArg} from '@ui/dialog/dialog.tokens'
import {StaticService} from '@services/static/static.service'
import {MatDialog} from '@angular/material/dialog'
import {CommunityContractService} from '@services/contract/community-contract.service'
import {AddProposalComponent} from '@ui/modals/add-proposal/add-proposal.component'
import {DaoMembershipContractService} from "@services/contract/dao-membership-contract.service";

@Component({
  selector: 'app-daoMembership-template',
  templateUrl: './daoMembership-template.component.html',
  styleUrls: ['./daoMembership-template.component.scss']
})
export class DaoMembershipTemplateComponent {

  @Input() public readonly contract!: GrantsVariationType

  member$: Observable<DAOMembershipNamespace.MemberInterface[]> = this.contractService.stream.pipe(
    filter(data => data?.status === "complete"),
    map((dataIn: RequestModel<ContractDataRawModel>) => {

      let member = dataIn?.payload?.member
      let members = dataIn?.payload?.dao?.member
      let res: DAOMembershipNamespace.MemberInterface[] = []

      if (member) {
        Object.keys(member).map((key) => {
          if (member && members) {
            res.push(
              {
                address: key,
                vote: parseInt(member[key]?.voting?.state?.value || '0'),
                status: members[key]?.status?.value || 'no status'
              }
            )
          }
        })
      }

      return res
    })
  )

  membership$: Observable<DAOMembershipNamespace.MembershipInterface[]> = this.contractService.stream
    .pipe(
      filter(data => data?.status === "complete"),
      map((dataIn: RequestModel<ContractDataRawModel>) => {

        let membership = dataIn?.payload?.membership
        let res: DAOMembershipNamespace.MembershipInterface[] = []

        if (membership) {
          res = Object.keys(membership).map((key) => {
            let status = ''
            if (membership) {
              let locStatus = membership[key]?.status?.value
              if (locStatus)
                status = locStatus
            }
            return ({
              address: key,
              status,
            })
          }).filter(e => e.status)
        }

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
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  ngOnInit(): void {
  }

  onAddProposal(): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: AddProposalComponent,
        params: {
          title: translate('modal.texts.propose_special_voting'),
          submitCallBack: (data: SubmitCallBackAddProposalArg) => {
            this.communityContractService.addProposal(
              data.tokenId,
              data.description,
              data.email,
              data.link,
              data.logo,
              data.ticker,
              data.hash,
            )
              .subscribe(() => {
                this.cdr.markForCheck()
              })
          }
        }
      }
    })
  }

  vote(address: string, voteValue: "like" | "dislike"): void {
    this.daoMembershipContractService.voteForDAOMember(address, voteValue).subscribe()
  }

}
