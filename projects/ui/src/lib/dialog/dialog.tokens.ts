import { InjectionToken } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { DialogComponent } from './dialog.component'
import { ContractGrantModel } from '@services/contract/contract.model'
import {CommunityContractService} from "@services/contract/community-contract.service";


export interface submitCallBackApplyArg {
  id: string, team: string, link: string
}

export interface submitCallBackProposeArg {
  name: string, link: string
}

export interface DialogParams {
  templateId?: string,
  title?: string,
  submitBtnText?: string,
  grant?: ContractGrantModel,
  dialogRef: MatDialogRef<DialogComponent>,
  submitCallBack?: (data: submitCallBackProposeArg | submitCallBackApplyArg) => void,
}

export const DIALOG_DATA = new InjectionToken<DialogParams>('Dialog Data')
