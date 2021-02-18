import {ContractGrantModel} from '@services/contract/contract.model'
import {UserDataInterface} from '@services/user/user.interface'
import {GrantStatusEnum} from '@services/static/static.model'
import {TeamsAndSolutionsControlsInterface} from '@pages/entity-page/entity.interface'
import {IScore} from "@services/interface";
import {LinkHttpPipe} from "@libs/pipes/link-http.pipe";

const linkHttpPipe: LinkHttpPipe = new LinkHttpPipe()

export const teamsAndSolutionsControls = (user: UserDataInterface, grant: ContractGrantModel): TeamsAndSolutionsControlsInterface => {
  const result: TeamsAndSolutionsControlsInterface = {
    isShowSolutionControls: true,
    stepType: 'team',
    isApplyBtn: false,
    isSubmitSolutionBtn: false,
    isShowAllTeam: false,
    teamVoteKeys: [],
    solutionVoteKeys: [],
    leaderIds: [],
    isShow: true
  }
  if (grant && grant.status && grant.status.value && grant.app) {
    // isShowSolutionControls
    const status = grant.status.value
    if (
      status === GrantStatusEnum.solutionChosen ||
      status === GrantStatusEnum.rejected
    ) {
      result.isShowSolutionControls = false
    }

    // stepType
    if (
      status === GrantStatusEnum.noStatus
      || status === GrantStatusEnum.proposed
      || status === GrantStatusEnum.readyToApply
      // status === GrantStatusEnum.workStarted ||
      // status === GrantStatusEnum.proposed ||
      // status === GrantStatusEnum.readyToApply
      // // || status === GrantStatusEnum.workStarted
    ) {
      result.stepType = IScore.EStepType.team
    } else {
      result.stepType = IScore.EStepType.solution
    }
    // isApplyBtn
    if (user.roles.isAuth && status === GrantStatusEnum.readyToApply) {
      result.isApplyBtn = true
    } else {
      result.isApplyBtn = false
    }
    // isSubmitSolutionBtn
    if (user.roles.isAuth && status === GrantStatusEnum.workStarted) {
      result.isSubmitSolutionBtn = true
      grant.app.forEach((app) => {
        const id = app.leader.value
        const score = app?.score?.applicant?.value || 0
        if (app.solution && app.solution.key.includes(user.userAddress.slice(-15))) {
          result.isSubmitSolutionBtn = false
        } else if (
          id === user.userAddress
          && score < 1
        ) {
          result.isSubmitSolutionBtn = false
        }
      })
    } else {
      result.isSubmitSolutionBtn = false
    }
    // isShowAllTeam
    if (
      status === GrantStatusEnum.noStatus ||
      status === GrantStatusEnum.proposed ||
      status === GrantStatusEnum.readyToApply
    ) {
      result.isShowAllTeam = true
    } else {
      result.isShowAllTeam = false
    }
    // teamVoteKeys
    let userKey = user.userAddress.slice(-15)
    const teamKeys: string[] = []
    if (!!grant && grant.app) {
      grant.app.forEach((e) => {
        if (e.key) {
          teamKeys.push(userKey + e.key)
        }
      })
    }
    teamKeys.forEach((key) => {
      if (grant.vh && grant.vh[key]) {
        result.teamVoteKeys.push(key.slice(-25))
      }
    })
    // solutionVoteKeys
    grant.app.forEach((app) => {
      if (app.voted && app.voted.solution) {
        result.solutionVoteKeys = app.voted.solution.value.split(';').filter(x => x) || []
      }
    })
    userKey = user.userAddress
    // leaderIds
    grant.app.forEach((app) => {
      result.leaderIds.push(app.leader.value)
    })
    // isShow
    if (grant.status.value === GrantStatusEnum.rejected && grant.app.length === 0) {
      result.isShow = false
    }
  }
  return result
}

export const isAcceptWorkResultBtnInterhack = (user: UserDataInterface, grant: ContractGrantModel): boolean => {
  if (grant && grant.app) {
    const isWG = user.roles.isWG
    let isVote = false
    if (grant.app.length) {
      grant.app.forEach((app) => {
        if (app.voted && app.voted.solution && app.voted.solution.value) {
          isVote = true
        }
      })
    }
    const isStatusMatch = grant?.status?.value === GrantStatusEnum.workFinished
    return isVote && isWG && isStatusMatch
  } else {
    return false
  }
}

export const teamsAndSolutionTypeTeam = (
  grant: ContractGrantModel, user: UserDataInterface, controls: TeamsAndSolutionsControlsInterface
): IScore.IUnit[] => {

  const res: IScore.IUnit[] = []
  const apps = grant.app || []

  apps.forEach(app => {

    const appKey: string = app.key || ""
    const isCanVote = (!controls.teamVoteKeys.includes(appKey)
      || GrantStatusEnum.readyToApply !== grant?.status?.value)
      && GrantStatusEnum.rejected !== grant?.status?.value
      && GrantStatusEnum.workStarted !== grant?.status?.value

    const unit: IScore.IUnit = {
      isWinner: false,
      isPerformer: !!app.process?.value,
      isWinnerIcon: !!app.process?.value,
      isPerformerIcon: true,
      name: app.name.value,
      solutionLink: null,
      status: {
        isSolution: false,
        isRejected: false,
        isApprove: false
      },
      square: {
        score: app?.score?.applicant?.value || 0,
        id: app?.id?.value || '',
        isCanVote,
        isShowResult: !user.roles.isDAO,
      },
      teamLink: linkHttpPipe.transform(app?.link?.value)
    }

    res.push(unit)

  })

  return res

}

export const teamsAndSolutionTypeSolution = (
  grant: ContractGrantModel,
  user: UserDataInterface,
  controls: TeamsAndSolutionsControlsInterface,
  fake: boolean,
  multiWinners: boolean,
  winnerSolutionId: string
): IScore.IUnit[] => {

  const res: IScore.IUnit[] = []
  const apps = grant.app || []

  apps.forEach(app => {

    const isSolution: boolean = !!app?.solution?.value
    const isCanVote: boolean =
      !app?.voted?.solution?.value.includes(user.userAddress)
      && GrantStatusEnum.solutionChosen !== grant?.status?.value
      && GrantStatusEnum.rejected !== grant?.status?.value
      && !fake
      && isSolution
    const isWinner: boolean =
      !multiWinners
      && GrantStatusEnum.solutionChosen === grant?.status?.value
      && !!app?.process
      && app?.id?.value === winnerSolutionId

    const unit: IScore.IUnit = {
      isWinner,
      isPerformer: false,
      isWinnerIcon: true,
      isPerformerIcon: true,
      name: app.name.value,
      solutionLink: app?.solution?.value ? app?.solution?.value : null,
      status: {
        isSolution: app?.solution?.value ? true : false,
        isRejected: false,
        isApprove: false
      },
      square: {
        score: app?.score?.solution?.value || 0,
        id: app?.id?.value || '',
        isCanVote,
        isShowResult: !user.roles.isDAO,
      },
      teamLink: linkHttpPipe.transform(app?.link?.value)
    }

    const applicantScore = app?.score?.applicant?.value || 0

    if (applicantScore > 0)
      res.push(unit)

  })

  return res
}
