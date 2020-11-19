import { Injectable } from '@angular/core';
import {SignerService} from "@services/signer/signer.service";
import {ContractService} from "@services/contract/contract.service";
import {tap} from "rxjs/operators";
import {ContractDataModel, ContractGrantRawModel} from "@services/contract/contract.model";
import {TeamInterface} from "@services/team/team.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teams = new BehaviorSubject<TeamInterface[]>([])

  private readonly data$ = this.contractService.stream.pipe(
    tap(
      (e) => {

        this.teams.next(this.defineTeamList(e))
      }
    )
  ).subscribe()

  constructor(private signerService: SignerService, private contractService: ContractService) {}

  private defineTeamList(data: ContractDataModel): TeamInterface[] {
    let result: TeamInterface[] = []
    let tasks = data.tasks
    for (const key of Object.keys(tasks)) {
      // @ts-ignore
      const grant = tasks[key]
      if(grant.app) {
        let app = grant.app
        for (const key2 of Object.keys(app)) {
          let id = app[key2].leader?.value
          let link = app[key2].link?.value
          let name = app[key2].name?.value
          if(id || link || name) {
            result.push({
              id: id,
              link: link,
              name: name,
            })
          }
        }
      }
    }
    return result
  }
}
