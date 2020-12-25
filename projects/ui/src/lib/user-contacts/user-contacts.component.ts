import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { UserInterface } from '@constants'

@Component({
  selector: 'ui-user-contacts',
  templateUrl: './user-contacts.component.html',
  styleUrls: ['./user-contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContactsComponent implements OnInit {
  private GSaddress: string | null = null

  @Input() set address (address: string) {
    this.GSaddress = address
  }

  get address (): string {
    return this.GSaddress ? this.GSaddress : ''
  }

  @Input() user: UserInterface | null = null

  constructor () { }

  ngOnInit (): void {
  }
}
