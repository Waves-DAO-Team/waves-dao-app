import {ContractGrantExtendedModel, ContractGrantModel, ContractRawDataNumber} from "@services/contract/contract.model";
import {translate} from "@ngneat/transloco";
import {GrantStatusEnum} from "@services/static/static.model";

export const fixReward = (grants: ContractGrantModel[]): ContractGrantModel[] => {
  return grants.map((e) => {
    if (e.reward && e.reward.value && typeof e.reward.value === 'number') {
      e.reward.value = (e.reward.value / 100000000).toFixed(2)
    } else if (e.reward === undefined) {
      const newData: ContractRawDataNumber = {
        key: '', type: 0, value: '0.00'
      }
      e.reward = newData
    }
    return e
  })
}

export const sortOtherGrant = (data: ContractGrantExtendedModel[]): ContractGrantExtendedModel[] => {
  let normList: ContractGrantExtendedModel[] = []
  let rejectedList: ContractGrantExtendedModel[] = []
  let noStatusList: ContractGrantExtendedModel[] = []
  if (data)
    data.forEach((grant) => {
      if (grant.status) {
        if (grant.status && grant.status.value !== GrantStatusEnum.rejected) {
          normList.push(grant)
        } else {
          rejectedList.push(grant)
        }
      } else {
        noStatusList.push(grant)
      }

    })
  return [...normList, ...noStatusList, ...rejectedList]
}
