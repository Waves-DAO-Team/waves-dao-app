import { UserDataInterface } from '@services/user/user.interface'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantStatusEnum } from '@services/static/static.model'
import { TeamsControlsInterface } from '@pages/entity-page/entity.interface'

export const isFinishApplicantsVoteBtn = (user: UserDataInterface, grant: ContractGrantModel): boolean => {
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

export const getWinnerTeamId = (grant: ContractGrantModel): string => {
  const res = {
    key: '',
    score: 0
  }
  if (grant.app) {
    grant.app.forEach((app) => {
      if (app.key && app.score && app.score.value) {
        const score = parseInt(app.score.value, 10)
        if (res.score <= score) {
          res.key = app.key
          res.score = score
        }
      }
    })
  }
  return res.key
}

export const isAcceptWorkResultBtn = (user: UserDataInterface, grant: ContractGrantModel): boolean => {
  let result = false
  if (grant && grant.app && grant.status && grant.status.value === GrantStatusEnum.workStarted) {
    let isPerformer = false
    const isWG = user.roles.isWG
    grant.app.forEach((app) => {
      if (
        app && app.process && app.process.value && app.process.value === GrantStatusEnum.workStarted
        // && app.leader.value === user.userAddress
      ) {
        isPerformer = true
      }
    })
    result = isPerformer && isWG
  }
  return result
}

export const teamsControls = (user: UserDataInterface, grant: ContractGrantModel): TeamsControlsInterface => {
  const result: TeamsControlsInterface = {
    isVoteControls: 'show',
    voteFor: [],
    isApplyBtn: false
  }
  // isApplyBtn
  if (user.roles.isAuth && grant && grant.app && grant.status && grant.status.value) {
    const status = grant.status.value
    if (GrantStatusEnum.readyToApply === status) {
      result.isApplyBtn = true
    }
    grant.app.forEach((app) => {
      if (app.leader && app.leader.value && app.leader.value === user.userAddress) {
        result.isApplyBtn = false
      }
    })
  }
  // isVoteControls
  if (grant.app) {
    grant.app.forEach((app) => {
      if (app.key && app.voted && app.voted.value && app.voted.value.includes(user.userAddress)) {
        result.voteFor.push(app.key)
      }
    })
  }
  if (grant && grant.status && grant.status.value && grant.status.value === GrantStatusEnum.readyToApply) {
    result.isVoteControls = 'show'
  } else {
    result.isVoteControls = 'hidden'
  }
  return result
}

export const isStartWorkBtn = (user: UserDataInterface, grant: ContractGrantModel): boolean => {
  let result = false
  const temp = {
    leader: '',
    score: 0
  }
  if (grant && grant.app) {
    grant.app.forEach((app) => {
      if (app.leader && app.score && app.score.value) {
        const score = parseInt(app.score.value, 10)
        if (temp.score <= score) {
          temp.leader = app.leader.value
          temp.score = score
        }
      }
    })
  }
  if (grant && grant.status && grant.status.value === GrantStatusEnum.teamChosen && temp.leader === user.userAddress) {
    result = true
  }
  return result
}

export const isShowAddRewardBtn = (user: UserDataInterface, grant: ContractGrantModel): boolean => {
  if (grant) {
    const isWG = user.roles.isWG
    const isNoReward = !grant?.reward?.value
    const isStatusMatch =
      !grant?.status?.value ||
      grant?.status?.value === GrantStatusEnum.proposed ||
      grant?.status?.value === GrantStatusEnum.readyToApply ||
      grant?.status?.value === GrantStatusEnum.teamChosen
    return isNoReward && isWG && isStatusMatch
  } else {
    return false
  }
}

export const isFinishVoteBtn = (user: UserDataInterface, grant: ContractGrantModel): boolean => {
  if (grant && grant.app) {
    const isVoted = !!grant.voted
    const isStatusMatch = grant?.status?.value === GrantStatusEnum.proposed
    const isWG = user.roles.isWG
    return isVoted && isWG && isStatusMatch
  } else {
    return false
  }
}
