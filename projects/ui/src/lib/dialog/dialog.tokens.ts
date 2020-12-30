import { InjectionToken } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { DialogComponent } from './dialog.component'
import { ContractGrantModel } from '@services/contract/contract.model'
import {SubmitSolutionComponent} from "@ui/modals/submit-solution/submit-solution.component";

export interface SubmitCallBackApplyArg {
  id: string, team: string, link: string
}

export interface SubmitCallBackProposeArg {
  name: string, link: string
}
export interface SubmitCallBackRewardArg {
  reward: string
}
export interface SubmitCallBackAcceptWorkResultArg {
  reportLink: string
}

export interface SubmitCallBackSubmitSolutionResultArg {
  solutionLink: string
}

export interface DialogParams {
  templateId?: string,
  title?: string,
  submitBtnText?: string,
  grant?: ContractGrantModel,
  grantId?: string,
  dialogRef: MatDialogRef<DialogComponent>,
  submitCallBack?: (data:
                        SubmitCallBackProposeArg |
                        SubmitCallBackApplyArg |
                        SubmitCallBackRewardArg |
                        SubmitCallBackAcceptWorkResultArg |
                        SubmitCallBackSubmitSolutionResultArg
  ) => void,
}

export const DIALOG_DATA = new InjectionToken<DialogParams>('Dialog Data')
