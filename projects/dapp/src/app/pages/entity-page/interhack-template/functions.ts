import { ContractGrantModel } from '@services/contract/contract.model'
import { UserDataInterface } from '@services/user/user.interface'
import { grantStatusEnum } from '@services/static/static.model'
import { TeamsAndSolutionsControlsInterface } from '@pages/entity-page/entity.interface'

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
      status === grantStatusEnum.solutionChosen ||
      status === grantStatusEnum.rejected
    ) {
      result.isShowSolutionControls = false
    }
    // stepType
    if ((status === grantStatusEnum.workStarted ||
      status === grantStatusEnum.proposed ||
      status === grantStatusEnum.readyToApply ||
      status === grantStatusEnum.workStarted)
    ) {
      result.stepType = 'team'
    } else {
      result.stepType = 'solution'
    }
    // isApplyBtn
    if (user.roles.isAuth && status === grantStatusEnum.readyToApply) {
      result.isApplyBtn = true
    } else {
      result.isApplyBtn = false
    }
    // isSubmitSolutionBtn
    if (user.roles.isAuth && status === grantStatusEnum.workStarted) {
      result.isSubmitSolutionBtn = true
      grant.app.forEach((app) => {
        if (app.solution && app.solution.key.includes(user.userAddress.slice(-15))) {
          result.isSubmitSolutionBtn = false
        }
      })
    } else {
      result.isSubmitSolutionBtn = false
    }
    // isShowAllTeam
    if (
      status === grantStatusEnum.noStatus ||
      status === grantStatusEnum.proposed ||
      status === grantStatusEnum.readyToApply
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
      // @ts-ignore
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
    if (grant.status.value === grantStatusEnum.rejected && grant.app.length === 0) {
      result.isShow = false
    }
  }
  return result
}
