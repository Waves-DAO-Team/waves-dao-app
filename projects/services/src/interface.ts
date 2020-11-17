export enum GrantStatusEnum {
  proposed = 'proposed',
  readyToApply = 'ready_to_apply',
  rejected = 'rejected',
  teamChosen = 'team_chosen',
  workStarted = 'work_started',
  workFinished = 'work_finished',
  noStatus = 'no_status'
}

export interface InvokeResponseInterface {
  call: {}
  dApp: string
  fee: number
  feeAssetId: string
  id: string
  payment: []
  proofs: []
  sender: string
  senderPublicKey: string
  timestamp: number
  type: number
  version: number
}
