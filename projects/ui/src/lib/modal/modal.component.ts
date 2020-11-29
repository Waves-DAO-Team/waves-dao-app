import { EventEmitter, Component, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
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
