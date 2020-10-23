export type ContractRawDataKey = string
export type ContractRawDataValue = string
export type ContractRawDataType = string

export interface ContractRawDataItem {
  key: ContractRawDataKey
  value: ContractRawDataValue
  type: ContractRawDataType
}

export type ContractRawData = ContractRawDataItem[]

export interface ContractDataModel {
  working: {
    group: ContractRawDataItem
  }
  group: {
    member: ContractRawDataItem
  }
  dao: {
    members: ContractRawDataItem
  }
}
