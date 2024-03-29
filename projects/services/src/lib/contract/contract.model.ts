export type ContractRawDataKey = string
export type ContractRawDataValue = string
export type ContractRawDataTypeString = 'string'
export type ContractRawDataTypeNumber = 'integer'

export type ContractRawDataEntityId = string

export interface ContractRawDataString {
  key: ContractRawDataKey
  value: ContractRawDataValue
  type: ContractRawDataTypeString | ContractRawDataTypeNumber
}

export interface ContractRawDataNumber {
  key: ContractRawDataKey
  value: ContractRawDataValue
  type: ContractRawDataTypeNumber
}

export type ContractRawData = ContractRawDataString[]

export type ContractGroupContext = {[s: string]: ContractRawDataString | ContractGroupContext}

export interface ContractGrantAppModel {
  id: ContractRawDataString
  leader: ContractRawDataString
  name: ContractRawDataString
  link: ContractRawDataString
  key?: string
  hash?: ContractRawDataString
  manager?: string
  process?: {
    key: string
    type: string
    value: string
  }
  report?: {
    key: string
    type: string
    value: string
  }
  score?: {
    key: string
    type: string
    value: string
    applicant?: {
      key: string
      type: string
      value: number
    }
    solution?: {
      key: string
      type: string
      value: number
    }
  }
  voted: {
    key: string
    type: string
    value: string
    solution?: {
      key: string
      type: string
      value: string
    }
  }
  solution?: {
    hash: ContractRawDataString
    key: string
    type: string
    value: string
  }
  votes?: {
    key?: string
    type?: string
    value?: string,
    applicant?: {
      key: string
      type: string
      value: string
    }
    solution?: {
      key: string
      type: string
      value: string
    }
  }
  isHashValid?: Promise<boolean | null>
}

export interface ContractGrantCommonModel {
  id?: ContractRawDataEntityId
  app?: {[s: string]: ContractGrantAppModel} | ContractGrantAppModel[]

  applicants?: ContractRawDataString
  link?: ContractRawDataString
  reward?: ContractRawDataNumber
  status?: ContractRawDataString
  leader?: ContractRawDataString
  title?: ContractRawDataString
  performer?: ContractRawDataString
  isShowAppliers?: boolean
  report?: ContractRawDataString,
  vh?: {[s: string]: ContractRawDataString}
  voted?: {[s: string]: ContractRawDataString}
  voting?: {
    amount?: ContractRawDataNumber
    state?: ContractRawDataNumber
  }
}

export interface GrantParams {
  my?: boolean,
  amount?: string,
  score?: string,
  count?: string,
  max?: string,
  min?: string
  label?: string
  important?: boolean
  winnerName?: string | null
  allTeamVoteScore?: string
  solutionCount?: string
  teamVoteScore?: string
}

export interface ContractGrantRawModel extends ContractGrantCommonModel {
  app?: {[s: string]: ContractGrantAppModel}
  description?: string
  email?: string
  version?: string
}

export interface ContractGrantModel extends ContractGrantCommonModel {

  app?: ContractGrantAppModel[]
  id?: ContractRawDataEntityId
  performer?: ContractRawDataString
  link?: ContractRawDataString
  hash?: ContractRawDataString
  leader?: ContractRawDataString
  isShowAppliers?: boolean
  report?: ContractRawDataString,
  label?: GrantParams
  createdAt?: ContractRawDataNumber
  winnerName?: string,
//   votings?: \ {
//
// }
}

export interface ContractGrantExtendedModel extends ContractGrantModel{
  isApproved: boolean,
  isLeader: boolean,
  isAmount: boolean,
  isVotingStarted: boolean,
  isWG: boolean,
  isReward: boolean,
  isNewGrant: boolean,
  isCanceled: boolean,
  isWorkStarted: boolean,
  isShowVoting: boolean,
  isVoteForGrant: boolean
  isHashValid?: Promise<boolean | null>,
  logo?: string,
  tasks?: string,
  ticker?: string,
  version?: string,
}

// export interface ContractGrantRawModel extends ContractGrantCommonModel {
//   tasks?: {[s: string]: ContractGrantModel}
//   app?: {[s: string]: ContractGrantAppModel}
// }



// export interface ContractGrantExtendedModel extends ContractGrantModel {
//   grants: ContractGrantExtendedModel[]
//   voteText?: string
//   statusText?: string
//   rewardText?: string
//   canBeCompleted?: string[]
// }

export interface ContractDataRawModel {
  address?: string
  tasks?: {[s: string]: ContractGrantRawModel}

  description?: {[s: string]: {[s: string]: ContractRawDataString}}
  email?: {[s: string]: ContractRawDataString}
  version?: {[s: string]: ContractRawDataString}
  link?: {[s: string]: ContractRawDataString}
  logo?: {[s: string]: ContractRawDataString}
  ticker?: {[s: string]: ContractRawDataString}
}

export interface ContractDataModel {
  address: string
  tasks: ContractGrantModel[]
}

export interface ContractMembershipDataModel {
  address?: string
  manager?: string
  working?: {
    group: {
      member: {[s: string]: {
          weight: ContractRawDataString
        }}
      name: ContractRawDataString
      size: ContractRawDataNumber
    }
  }
  dao?: {
    member: {[s: string]: {
        weight: ContractRawDataString
      }}
    members: ContractRawDataString
    size: ContractRawDataNumber
  }
}

export namespace IVotings {
  export interface ITask {
    status?: string
    logo?: string
    description?: string
    link?: string
    email?: string
    ticker?: string
    tickerId?: string
  }
}
