import { UserDataInterface } from '@services/user/user.interface'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantStatusEnum } from '@services/static/static.model'
import { TeamsControlsInterface } from '@pages/entity-page/entity.interface'
import {IScore} from '@services/interface'
import {translate} from '@ngneat/transloco'
import {LinkHttpPipe} from '@libs/pipes/link-http.pipe'

const linkHttpPipe = new LinkHttpPipe()

export const teamsControls = (user: UserDataInterface, grant: ContractGrantModel): TeamsControlsInterface => {

  let isVoteControls: 'show' | 'hidden'
  const voteFor: string[] = []
  let isApplyBtn = false

  // isApplyBtn
  if (user.roles.isAuth && grant && grant.app && grant.status && grant.status.value) {
    const status = grant.status.value
    if (GrantStatusEnum.readyToApply === status) {
      isApplyBtn = true
    }
    grant.app.forEach((app) => {
      if (app.leader && app.leader.value && app.leader.value === user.userAddress) {
        isApplyBtn = false
      }
    })
  }

  // isVoteControls
  if (grant.app) {
    grant.app.forEach((app) => {
      if (app.key && app.voted && app.voted.value && app.voted.value.includes(user.userAddress)) {
        voteFor.push(app.key)
      }
    })
  }

  if (grant && grant.status && grant.status.value && grant.status.value === GrantStatusEnum.readyToApply) {
    isVoteControls = 'show'
  } else {
    isVoteControls = 'hidden'
  }

  return {
    isVoteControls,
    voteFor,
    isApplyBtn
  }

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

export const prepareTeamsHeaderData = (
  grant: ContractGrantModel,
  user: UserDataInterface,
  isBalance: boolean
): IScore.IHeader => {

  let isProcess = false
  grant?.app?.forEach( app => {
    if(!!app.process?.value) {
      isProcess = true
    }
  })

  return {
    applyBtnText: translate('entity.apply'),
    isApplyBtn: teamsControls(user, grant).isApplyBtn || false,
    isBalanceMoreCommission: isBalance !== false,
    isShowAppliers: grant?.isShowAppliers || false,
    isUnauthorized: user.roles.isUnauthorized,
    titleText: translate('entity.teams'),
    isShowLogInForApplyBtn: user.roles.isUnauthorized && !isProcess
  }

}

export const prepareTeamsData = (
  grant: ContractGrantModel,
  user: UserDataInterface,
  isProcess: boolean
): IScore.IUnit[] => {

  const res: IScore.IUnit[] = []
  const apps = grant.app || []
  const controls = teamsControls(user, grant)

  apps.forEach(app => {

    const isCanVote =
      (
        controls?.isVoteControls !== 'hidden' && GrantStatusEnum.rejected !== grant?.status?.value
      )
      && !controls?.voteFor.includes(app?.id?.value)
    const score = app?.score?.value || 0

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
        score: app.score?.value || 0,
        id: app?.id?.value || '',
        isCanVote,
        isShowResult: !user.roles.isDAO,
      },
      teamLink: linkHttpPipe.transform(app?.link?.value)
    }

    if(isProcess && score> 0 || !isProcess) {
      res.push(unit)
    }

  })

  return res

}

export const prepareIsRejectBtnData = (
  grant: ContractGrantModel,
  user: UserDataInterface,
): boolean => {
  if (grant) {
    const isWG = user.roles.isWG
    const isStatusMatch = grant?.status?.value !== GrantStatusEnum.rejected
    return isWG && isStatusMatch
  } else {
    return false
  }
}

