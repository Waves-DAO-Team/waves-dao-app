import {UserDataInterface} from '@services/user/user.interface'
import {ContractGrantExtendedModel, ContractGrantModel} from '@services/contract/contract.model'
import {GrantStatusEnum} from '@services/static/static.model'

export const getEntityData = (user: UserDataInterface, grant: ContractGrantModel): ContractGrantExtendedModel => {
  return {
    ...grant,
    isApproved: grant?.status?.value === GrantStatusEnum.approved,
    isLeader: grant?.leader?.value === user.userAddress,
    isAmount: !!grant?.voting?.amount,
    isVotingStarted: grant?.status?.value === GrantStatusEnum.votingStarted,
    isWG: user.roles.isWG,
    isReward: !!grant?.reward?.value,
    isNewGrant: !grant?.status?.value,
    isCanceled: grant?.status?.value !== GrantStatusEnum.workFinished && grant?.status?.value !== GrantStatusEnum.rejected,
    isWorkStarted: grant?.status?.value === GrantStatusEnum.workStarted,
    isShowVoting: user.roles.isDAO && grant?.status?.value === GrantStatusEnum.votingStarted,
    isVoteForGrant: user.roles.isDAO && !!grant?.voted && !!grant?.voted[user.userAddress]
  }
}
