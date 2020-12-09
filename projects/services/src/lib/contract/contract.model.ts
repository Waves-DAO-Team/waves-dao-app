export type ContractRawDataKey = string
export type ContractRawDataValue = string
export type ContractRawDataTypeString = string
export type ContractRawDataTypeNumber = number

export type ContractRawDataEntityId = string

export enum GrantTypesEnum {
  web3 = 'web3',
  disruptive = 'disruptive',
  interhack = 'interhack'
}

export interface ContractRawDataString {
  key: ContractRawDataKey
  value: ContractRawDataValue
  type: ContractRawDataTypeString
}

export interface ContractRawDataNumber {
  key: ContractRawDataKey
  value: ContractRawDataValue
  type: ContractRawDataTypeNumber
}

export type ContractRawData = ContractRawDataString[]

export interface ContractGrantAppModel {
  id: ContractRawDataString
  leader: ContractRawDataString
  name: ContractRawDataString
  link: ContractRawDataString
  key?: string
  process?: {
    key: string
    type: string
    value: string
  },
  score?: {
    key: string
    type: string
    value: string
  }
  voted: {
    key: string
    type: string
    value: string
  }
}

export interface ContractGrantCommonModel {
  id?: ContractRawDataEntityId
  status?: ContractRawDataString
  title?: ContractRawDataString
  reward?: ContractRawDataNumber
  voting?: {
    amount?: ContractRawDataNumber
    state?: ContractRawDataNumber
  }
  applicants?: ContractRawDataString
  voted?: {[s: string]: ContractRawDataNumber}
  app?: {[s: string]: ContractGrantAppModel} | ContractGrantAppModel[]
}

export interface ContractGrantRawModel extends ContractGrantCommonModel {
  app?: {[s: string]: ContractGrantAppModel}
}

export interface ContractGrantModel extends ContractGrantCommonModel {
  app?: ContractGrantAppModel[]
  id?: ContractRawDataEntityId;
  vh?: ContractGrantRawModel;
  performer?: ContractRawDataString,
  link?: ContractRawDataString;
  isShowAppliers?: boolean
}

export interface ContractGrantExtendedModel extends ContractGrantModel {
  voteText?: string;
  statusText?: string;
  rewardText?: string;
}

export interface ContractDataModel {
  address: string,
  working: {
    group: {
      member: {[s: string]: {
        weight: ContractRawDataString
      }}
      name: ContractRawDataString
      size: ContractRawDataNumber
    }
  }
  dao: {
    member: {[s: string]: {
        weight: ContractRawDataString
      }},
    members: ContractRawDataString
    size: ContractRawDataNumber
  }
  tasks: {[s: string]: ContractGrantRawModel}
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
  noStatus = 'no_status'
}
