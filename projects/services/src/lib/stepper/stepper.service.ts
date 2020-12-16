import {Injectable} from '@angular/core';
import {GrantStatusEnum} from "@services/static/static.model";
import {translate} from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  grantType: 'disruptive' | 'interhack' = "disruptive"

  disruptiveFormalStatuses = [
    {
      "key": "ready_to_apply",
      "value": translate('stepper.collecting_requests'),
    },
    {
      "key": "team_chosen",
      "value": translate('stepper.requests_selection_over'),
    },
    {
      "key": "work_started",
      "value": translate('stepper.work_started'),
    },
    {
      "key": "work_finished",
      "value": translate('stepper.work_finished'),
    }
  ]

  interhackFormalStatuses = [
    {
      "key": "ready_to_apply",
      "value": translate('stepper.collecting_solutions'),
    },
    {
      "key": "team_chosen",
      "value": translate('stepper.solutions_selection_over'),
    },
    {
      "key": "work_started",
      "value": translate('stepper.work_started'),
    },
    {
      "key": "work_finished",
      "value": translate('stepper.work_finished'),
    }
  ]

  public setType(type: 'disruptive' | 'interhack'): void{
    this.grantType = type
  }

  public getFormalStatuses() {
    return this.grantType === "disruptive" ? this.disruptiveFormalStatuses : this.interhackFormalStatuses
  }

  public getActiveId(status: string): number | null {
    let grant = "disruptive" ? this.disruptiveFormalStatuses : this.interhackFormalStatuses
    let res = null
    for (let i = 0; i < grant.length; i++) {
      if(grant[i].key === status) {
        res = i
      }
    }
    return res
  }

}
