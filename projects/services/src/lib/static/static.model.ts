export enum grantTypesEnum {
  web3 = 'web3',
  disruptive = 'disruptive',
  interhack = 'interhack'
}

export interface GrantsVariationType {
  type: string
  name: grantTypesEnum
  preview: string
  img: string
  title: string
  desc: string
  navigation: string
  banner: string
  about: string

  permissionCreateGrant?: boolean
  permissionFinishCreateGrant?: boolean
  permissionVote?: boolean
  permissionSettings?: boolean
}

export enum grantStatusEnum {
  proposed = 'proposed',
  readyToApply = 'ready_to_apply',
  approved = 'approved',
  rejected = 'rejected',
  teamChosen = 'team_chosen',
  solutionChosen = 'solution_chosen',
  workStarted = 'work_started',
  workFinished = 'work_finished',
  votingStarted = 'voting_started',
  noStatus = 'no_status'
}
