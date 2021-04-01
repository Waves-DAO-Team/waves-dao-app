import {ContractGrantModel} from '@services/contract/contract.model'

export interface Web3TemplateInterface extends ContractGrantModel {
  isApproved: boolean;
  isLeader: boolean;
  isAmount: boolean;
  isVotingStarted: boolean;
  isWG: boolean;
  isReward: boolean;
  isNewGrant: boolean;
  isCanceled: boolean;
  isWorkStarted: boolean;
  isShowVoting: boolean;
  isVoteForGrant: boolean;
  isHashValid?: Promise<boolean | null>
}
