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
export class DialogComponent {
  onConfirmClick (): void {
    this.dialogRef.close(true)
  }

  public close: EventEmitter<boolean> = new EventEmitter();

  public injectorData: Injector;
  public component: ComponentRef<any> | undefined;

  constructor (
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: {
        component: ComponentRef<any>
        params: {
          templateId?: string
        }
      },
      private injector: Injector
  ) {
    console.log('data', data)
    this.component = data.component
    this.injectorData = Injector.create({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            ...data?.params,
            dialogRef: this.dialogRef
          }
        }
      ],
      parent: injector
    })
  }

  ngOnInit (): void {}
}
