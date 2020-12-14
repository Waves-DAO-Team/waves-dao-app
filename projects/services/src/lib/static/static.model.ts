export enum GrantTypesEnum {
  web3 = 'web3',
  disruptive = 'disruptive',
  interhack = 'interhack'
}

export interface GrantsVariationType {
  type: string
  name: GrantTypesEnum
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

export enum GrantStatusEnum {
  proposed = 'proposed',
  readyToApply = 'ready_to_apply',
  rejected = 'rejected',
  teamChosen = 'team_chosen',
  workStarted = 'work_started',
  workFinished = 'work_finished',
  votingStarted = 'voting_started',
  noStatus = 'no_status'
}
