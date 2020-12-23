export interface VoteTeamEventInterface {
  voteValue: 'like' | 'dislike'
  teamIdentifier: string
}

export abstract class TemplateComponentAbstract {
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
