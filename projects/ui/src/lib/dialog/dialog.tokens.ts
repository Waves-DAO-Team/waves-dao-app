import {InjectionToken} from '@angular/core'
import {MatDialogRef} from '@angular/material/dialog'
import {DialogComponent} from './dialog.component'
import {ContractGrantModel} from '@services/contract/contract.model'

export interface SubmitCallBackApplyArg {
  id: string
  team: string
  link: string
  hash?: string
}

export interface SubmitCallBackProposeArg {
  name: string
  link: string
  hash?: string
}

export interface SubmitCallBackRewardArg {
  reward: string
}

export interface SubmitCallBackAcceptWorkResultArg {
  reportLink: string
  winnerTeamId?: string
}

export interface SubmitCallBackAddProposalArg {
  tokenId: string
  description: string
  email: string
  link: string
  hash: string
  logo: string
  ticker: string
}

export interface FinishApplicantsVotingArg {
  winnerTeamId?: string
}

export interface SubmitCallBackAddMemberArg {
  address: string
}

export interface SubmitCallBackSubmitSolutionResultArg {
  solutionLink?: string,
  hash: string
}

export interface DialogParams {
  teamIdList?: string[];
  solutionIdList?: string[];
  winnerId?: string;
  templateId?: string
  title?: string
  submitBtnText?: string
  proposedWinner?: string
  grant?: ContractGrantModel
  grantId?: string
  dialogRef: MatDialogRef<DialogComponent>
  hash?: string
  submitCallBack?: (data:
                      SubmitCallBackProposeArg |
                      FinishApplicantsVotingArg |
                      SubmitCallBackApplyArg |
                      SubmitCallBackRewardArg |
                      SubmitCallBackAcceptWorkResultArg |
                      SubmitCallBackSubmitSolutionResultArg |
                      SubmitCallBackAddMemberArg |
                      SubmitCallBackAddProposalArg
  ) => void
}

export const DIALOG_DATA = new InjectionToken<DialogParams>('Dialog Data')
