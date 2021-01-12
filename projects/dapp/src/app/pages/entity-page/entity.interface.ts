import { Subject } from 'rxjs'
import { ContractGrantModel } from '@services/contract/contract.model'

export interface VoteTeamEventInterface {
  voteValue: 'like' | 'dislike'
  teamIdentifier: string
}

export abstract class TemplateComponentAbstract {
  public grant$: Subject<ContractGrantModel> | undefined
  public abstract vote (value: 'like' | 'dislike'): void
  public abstract signup (): void
  public abstract openApplyModal (): void
  public abstract voteTeam ($event: VoteTeamEventInterface): void
  public abstract finishVote (): void
  public abstract startWork (): void
  public abstract reject (): void
  public abstract acceptWorkResult (): void
  public abstract finishApplicantsVote (): void
  public abstract addReward (): void
}


export interface TeamsAndSolutionsControlsInterface {
  isShowSolutionControls: boolean,
  stepType: string,
  isApplyBtn: boolean,
  isSubmitSolutionBtn: boolean,
  isShowAllTeam: boolean,
  teamVoteKeys: string[],
  solutionVoteKeys: string[],
  leaderIds: string[],
  isShow: boolean,
}
