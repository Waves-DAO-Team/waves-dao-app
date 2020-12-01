import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit {
  public readonly user$ = this.userService.data;

  constructor (
      private location: Location,
      public userService: UserService,
      public cdr: ChangeDetectorRef
  ) {}

  goBack (): void {
    this.location.back()
  }

  ngOnInit (): void {}
}
