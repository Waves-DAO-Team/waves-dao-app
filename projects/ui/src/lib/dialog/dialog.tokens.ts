import { InjectionToken } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { DialogComponent } from './dialog.component'
import { ContractGrantModel } from '@services/contract/contract.model'
import {CommunityContractService} from "@services/contract/community-contract.service";

export interface DialogParams {
  templateId?: string,
  title?: string,
  grant?: ContractGrantModel,
  dialogRef: MatDialogRef<DialogComponent>
  contractService?: CommunityContractService
}

export const DIALOG_DATA = new InjectionToken<DialogParams>('Dialog Data')
