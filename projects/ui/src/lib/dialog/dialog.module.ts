import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogComponent } from './dialog.component'
import { MatDialogModule } from '@angular/material/dialog'
import {TranslocoModule} from '@ngneat/transloco';
import { ModalsModule } from '@ui/modals/modals.module';

@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslocoModule,
    ModalsModule
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
