import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "@constants";

@Component({
  selector: 'ui-user-contacts',
  templateUrl: './user-contacts.component.html',
  styleUrls: ['./user-contacts.component.scss']
})
export class UserContactsComponent implements OnInit {

  @Input() user: UserInterface | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
