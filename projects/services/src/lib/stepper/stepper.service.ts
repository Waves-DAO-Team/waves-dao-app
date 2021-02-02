import { Injectable } from '@angular/core'
import { translate } from '@ngneat/transloco'

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  grantType: 'disruptive' | 'interhack' | 'web3' = 'disruptive'

  disruptiveFormalStatuses = [
    {
      key: 'ready_to_apply',
      value: translate('stepper.collecting_requests')
    },
    {
      key: 'team_chosen',
      value: translate('stepper.requests_selection_over')
    },
    {
      key: 'work_started',
      value: translate('stepper.work_started')
    },
    {
      key: 'work_finished',
      value: translate('stepper.work_finished')
    }
  ]

  interhackFormalStatuses = [
    {
      key: 'ready_to_apply',
      value: translate('stepper.requests_selection_start')
    },
    {
      key: 'work_started',
      value: translate('stepper.work_started')
    },
    {
      key: 'work_finished',
      value: translate('stepper.work_finished')
    },
    {
      key: 'solution_chosen',
      value: translate('stepper.solutions_selection_over')
    }
  ]

  // no_status        Подготовка            Preparing
  // voting_started   Начато голосование    Voting has started
  // approved         Работа начата         The work has begun
  // work_started     Работа начата         The work has begun
  // work_finished    Завершен              Finished

  dev3FormalStatuses = [
    {
      key: 'no_status',
      value: translate('stepper.preparing')
    },
    {
      key: 'voting_started|approved',
      value: translate('stepper.voting_has_started')
    },
    {
      key: 'work_started',
      value: translate('stepper.work_begun')
    },
    {
      key: 'work_finished',
      value: translate('stepper.work_finished')
    }
  ]

  public setType (type: 'disruptive' | 'interhack' | 'web3'): void {
    this.grantType = type
  }

  public getFormalStatuses (): Array<{key: string, value: string}> {
    switch (this.grantType) {
      case 'disruptive':
        return this.disruptiveFormalStatuses
      case 'web3':
        return this.dev3FormalStatuses
      case 'interhack':
        return this.interhackFormalStatuses
    }
  }

  public getActiveId (status: string): number {
    const grant = this.getFormalStatuses()
    let res = 0
    for (let i = 0; i < grant.length; i++) {
      if (grant[i].key.includes(status)) {
        res = i
      }
    }
    return res
  }
}
