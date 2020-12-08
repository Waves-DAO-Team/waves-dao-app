import { InjectionToken } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { DialogComponent } from './dialog.component'

export interface DialogParams {
  templateId?: string,
  dialogRef: MatDialogRef<DialogComponent>
}

export const DIALOG_DATA = new InjectionToken<DialogParams>('Dialog Data')
