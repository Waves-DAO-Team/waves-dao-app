import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { UserInterface } from '@constants'

@Component({
  selector: 'ui-user-contacts',
  templateUrl: './user-contacts.component.html',
  styleUrls: ['./user-contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContactsComponent implements OnInit {
  @Input() isList: boolean | null = null
  @Input() address: string | null = null
  @Input() user: UserInterface | null = null

  ngOnInit (): void {}
}
