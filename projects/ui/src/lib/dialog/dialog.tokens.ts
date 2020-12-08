import { InjectionToken } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { DialogComponent } from './dialog.component'
import { ContractGrantModel } from '@services/contract/contract.model'

export interface DialogParams {
  templateId?: string,
  grant?: ContractGrantModel,
  dialogRef: MatDialogRef<DialogComponent>
}

export const DIALOG_DATA = new InjectionToken<DialogParams>('Dialog Data')
