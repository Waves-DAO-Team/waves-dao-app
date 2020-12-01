import { EventEmitter, Component, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('0.1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('0.1s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ModalComponent implements OnInit {
  isOpen = false
  @Input() title = 'Are you sure?'
  @Input() text = 'Are you sure you want to apply for a grant?'
  @Output() willConfirm = new EventEmitter<boolean>();

  constructor (public cdr: ChangeDetectorRef) {

  }

  ngOnInit (): void {
  }

  openModal () {
    this.isOpen = true
    this.cdr.markForCheck()
  }

  onCancel (): void {
    this.isOpen = false
    this.willConfirm.emit(false)
  }

  onApply () {
    this.isOpen = false
    this.willConfirm.emit(true)
  }
}
