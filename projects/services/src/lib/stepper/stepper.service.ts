import { Injectable } from '@angular/core'
import { translate } from '@ngneat/transloco'

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  grantType: 'disruptive' | 'interhack' | 'web3' = 'disruptive'

  disruptiveFormalStatuses = [
    {
      key: 'proposed',
      value: translate('stepper.grant_propesed')
    },
    {
      key: 'ready_to_apply|team_chosen',
      value: translate('stepper.collecting_applications')
    },
    {
      key: 'work_started',
      value: translate('stepper.in_work')
    },
    {
      key: 'work_finished',
      value: translate('stepper.work_finished')
    }
  ]

  interhackFormalStatuses = [
    {
      key: 'ready_to_apply',
      value: translate('stepper.hackathon_proposed')
    },
    {
      key: 'work_started',
      value: translate('stepper.collecting_applications')
    },
    {
      key: 'work_finished',
      value: translate('stepper.hackathon_is_live')
    },
    {
      key: 'solution_chosen',
      value: translate('stepper.winner_is_selected')
    }
  ]

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
