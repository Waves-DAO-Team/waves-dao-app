export interface GrantUrl {
  contractType: string,
  entityId: string
}

export namespace IScore {
  export interface IUnit {
    name: string
    isWinner: boolean
    isWinnerIcon: boolean
    teamLink: string | null
    solutionLink: string | null
    square: ISquare
    status: IStatus
  }
  export interface IStatus {
    isSolution: boolean
    isRejected: boolean
  }
  export interface ISquare {
    score: number | string
    id: string
    isCanVote: boolean
    isShowResult: boolean
  }
}

