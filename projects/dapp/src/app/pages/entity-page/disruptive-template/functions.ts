import {UserDataInterface} from "@services/user/user.interface";
import {ContractGrantModel} from "@services/contract/contract.model";
import {GrantStatusEnum} from '@services/static/static.model'
import {TeamsControlsInterface} from "@pages/entity-page/entity.interface";

export function isFinishApplicantsVoteBtn(user: UserDataInterface, grant: ContractGrantModel): boolean {
  if (grant && grant.app) {
    const isStatusMatch = grant?.status?.value === GrantStatusEnum.readyToApply
    const isWG = user.roles.isWG
    let isVote = false
    grant.app.forEach((app) => {
      if (app.voted) {
        isVote = true
      }
    })
    return isVote && isWG && isStatusMatch
  } else {
    return false
  }
}

export function getWinnerTeamId(grant: ContractGrantModel): string {
  let res = {
    key: '',
    score: 0
  }
  if (grant.app)
    grant.app.forEach((app) => {
      if (app.key && app.score && app.score.value){
        const score = parseInt(app.score.value)
        if (res.score <= score) {
          res.key = app.key
          res.score = score
        }
      }
    })
  return res.key
}

export function teamsControls(user: UserDataInterface, grant: ContractGrantModel): TeamsControlsInterface {
  let result: TeamsControlsInterface = {
    isApplyBtn: false
  }
  // isApplyBtn
  if (user.roles.isAuth && grant && grant.app && grant.status && grant.status.value) {
    const status = grant.status.value
    if (GrantStatusEnum.readyToApply === status) {
      result.isApplyBtn = true
    }
    grant.app.forEach((app) => {
      if(app.leader.value === user.userAddress)
        result.isApplyBtn = false
    })
  }
  return result
}
