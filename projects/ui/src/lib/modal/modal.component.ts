import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';



@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  isOpen: boolean = false
  @Input() title: string = 'Are you sure?'
  @Input() text: string = 'Are you sure you want to apply for a grant?'
  @Output() willConfirm = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.isOpen = true
  }

  onCancel() {
    this.isOpen = false
    this.willConfirm.emit(false)
  }

  onApply() {
    this.isOpen = false
    this.willConfirm.emit(true)
  }
}
