import {
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  Injector,
  OnInit
} from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  onConfirmClick (): void {
    this.dialogRef.close(true)
  }

  constructor (
      public dialogRef: MatDialogRef<DialogComponent>
  ) {
  }

  ngOnInit (): void {}
}
