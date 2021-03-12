import {Component, Input, OnInit} from '@angular/core'
import {GrantsVariationType} from '@services/static/static.model'
import {ContractDataModel, ContractGrantRawModel, IVotings} from "@services/contract/contract.model";
import {Observable} from "rxjs";
import {ContractService} from "@services/contract/contract.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-votings-template',
  templateUrl: './votings-template.component.html',
  styleUrls: ['./votings-template.component.scss']
})
export class VotingsTemplateComponent implements OnInit {

  @Input() public readonly contract!: GrantsVariationType

  tasks$: Observable<IVotings.ITask[]>  = this.contractService.stream
    .pipe(
      tap((e) => console.log('++++', e)),
      map((dataIn) => {
        let tasks: IVotings.ITask[] = []
        const oldTasks = dataIn.tasks

        for (const key of Object.keys(oldTasks)) {
          let newTask = {
            status: oldTasks[key]?.status?.value || '',
            ticker: key
          }
          tasks.push(newTask)
        }

        tasks.forEach((task) => {
          if (
            dataIn.description
            && task.ticker
            && dataIn.email
            && dataIn.link
            && dataIn.logo
            && dataIn.ticker
          ) {
            const strangeTicker = `<${task?.ticker}>`
            task.description =  dataIn.description['<en>'][strangeTicker].value
            task.email = dataIn.email[strangeTicker].value
            task.link = dataIn.link[strangeTicker].value
            task.logo = dataIn.logo[strangeTicker].value
            task.ticker = dataIn.ticker[strangeTicker].value
          }
        })
        return tasks
      })
    )

  constructor (private readonly contractService: ContractService) { }

  ngOnInit (): void {
  }

}
