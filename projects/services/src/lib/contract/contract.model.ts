export type ContractRawDataKey = string
export type ContractRawDataValue = string
export type ContractRawDataTypeString = string
export type ContractRawDataTypeNumber = number

export type ContractRawDataEntityId = string

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

export interface ContractGrantModel {
  id?: ContractRawDataEntityId
  status?: ContractRawDataString
  title?: ContractRawDataString
  reward?: ContractRawDataNumber
  voting?: {
    amount?: ContractRawDataNumber
    state?: ContractRawDataNumber
  }
  voted?: {[s: string]: ContractRawDataNumber}
}

export interface ContractDataModel {
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
  tasks: {[s: string]: ContractGrantModel}
}
