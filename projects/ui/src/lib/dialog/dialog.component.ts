import {
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  Injector
} from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { ApplyComponent } from '@ui/modals/apply/apply.component'

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public close: EventEmitter<boolean> = new EventEmitter()
  public injectorData: Injector
  public component: ComponentRef<ApplyComponent> | undefined = undefined

  constructor (
    public dialogRef: MatDialogRef<DialogComponent>, // eslint-disable-line
    @Inject(MAT_DIALOG_DATA) public data: {
      component: ComponentRef<ApplyComponent>
      params: {
        templateId?: string
        title?: string
      }
    },
    private readonly injector: Injector
  ) {
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
}
