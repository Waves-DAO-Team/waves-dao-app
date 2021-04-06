import {ChangeDetectorRef, Component, Inject, Input, OnInit} from '@angular/core'
import {GrantsVariationType} from '@services/static/static.model'
import {ContractDataRawModel, IVotings} from '@services/contract/contract.model'
import {Observable} from 'rxjs'
import {ContractService} from '@services/contract/contract.service'
import {map} from 'rxjs/operators'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'
import {RequestModel} from '@services/request/request.model'
import { DomSanitizer } from '@angular/platform-browser'
import {DialogComponent} from '@ui/dialog/dialog.component'
import {translate} from '@ngneat/transloco'
import {SubmitCallBackAddProposalArg} from '@ui/dialog/dialog.tokens'
import {StaticService} from '@services/static/static.service'
import {MatDialog} from '@angular/material/dialog'
import {CommunityContractService} from '@services/contract/community-contract.service'
import {AddProposalComponent} from '@ui/modals/add-proposal/add-proposal.component'

@Component({
  selector: 'app-votings-template',
  templateUrl: './votings-template.component.html',
  styleUrls: ['./votings-template.component.scss']
})
export class VotingsTemplateComponent implements OnInit {

  @Input() public readonly contract!: GrantsVariationType

  tasks$: Observable<IVotings.ITask[]>  = this.contractService.stream
    .pipe(
      map((dataIn: RequestModel<ContractDataRawModel>) => {
        const oldTasks = dataIn?.payload?.tasks

        let tasks: IVotings.ITask[] = oldTasks ? Object.keys(oldTasks).map((key) =>
          ({
            status: oldTasks[key]?.status?.value || '',
            ticker: key,
            tickerId: key
          })
        ) : []
        tasks.forEach((task) => {
          if (
            dataIn?.payload?.description
            && task.ticker
            && dataIn?.payload?.email
            && dataIn?.payload?.link
            && dataIn?.payload?.logo
            && dataIn?.payload?.ticker
          ) {
            const strangeTicker = `<${task?.ticker}>`
            task.description =  dataIn?.payload?.description['<en>'][strangeTicker].value
            task.email = dataIn?.payload?.email[strangeTicker].value
            task.link = dataIn?.payload?.link[strangeTicker].value
            task.logo = dataIn?.payload?.logo[strangeTicker].value
            task.ticker = dataIn?.payload?.ticker[strangeTicker].value
          }
        })
        tasks = tasks.filter( e => e.status !== 'hide')
        return tasks
      })
    )

  constructor (
      private readonly contractService: ContractService,
      public domSanitizer: DomSanitizer,
      @Inject(API) public readonly api: AppApiInterface,
      public staticService: StaticService,
      private readonly dialog: MatDialog,
      public communityContractService: CommunityContractService,
      private readonly cdr: ChangeDetectorRef,
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) { }

  ngOnInit (): void {
  }

  onAddProposal (): void {
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

}
