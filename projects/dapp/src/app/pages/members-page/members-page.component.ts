import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'
import { environment } from '@dapp/src/environments/environment'

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit {
  environment = environment;
  grants$ = this.userService.data.subscribe(() => {
    this.cdr.markForCheck()
  })

  constructor (private location: Location, public userService: UserService, public cdr: ChangeDetectorRef) {
  }

  goBack (): void {
    this.location.back()
  }

  ngOnInit (): void {

  }
}
