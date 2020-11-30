import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit {
  grants$ = this.userService.data.subscribe(() => {
    this.cdr.markForCheck()
  })

  constructor (private location: Location, private userService: UserService, public cdr: ChangeDetectorRef) {
  }

  goBack (): void {
    this.location.back()
  }

  ngOnInit (): void {

  }
}
