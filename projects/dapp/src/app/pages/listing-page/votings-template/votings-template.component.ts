import {Component, Inject, Input, OnInit} from '@angular/core'
import {GrantsVariationType} from '@services/static/static.model'
import {ContractDataRawModel, IVotings} from '@services/contract/contract.model'
import {Observable} from 'rxjs'
import {ContractService} from '@services/contract/contract.service'
import {map} from 'rxjs/operators'
import {API, AppApiInterface} from '@constants'
import {RequestModel} from '@services/request/request.model'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-votings-template',
  templateUrl: './votings-template.component.html',
  styleUrls: ['./votings-template.component.scss']
})
export class VotingsTemplateComponent implements OnInit {

  @Input() public readonly contract!: GrantsVariationType
  @Inject(API) public readonly api: AppApiInterface | undefined

  tasks$: Observable<IVotings.ITask[]>  = this.contractService.stream
    .pipe(
      map((dataIn: RequestModel<ContractDataRawModel>) => {
        const oldTasks = dataIn?.payload?.tasks
        const tasks: IVotings.ITask[] = oldTasks ? Object.keys(oldTasks).map((key) => ({
            status: oldTasks[key]?.status?.value || '',
            ticker: key
          })) : []

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
        return tasks
      })
    )

  constructor (private readonly contractService: ContractService,
               public domSanitizer: DomSanitizer
  ) { }

  ngOnInit (): void {
  }

}
