import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'
import { API, AppApiInterface } from '@constants'

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersPageComponent implements OnInit {
  public readonly user$ = this.userService.data;

  constructor (
      private location: Location,
      public userService: UserService,
      public cdr: ChangeDetectorRef,
      @Inject(API) public readonly api: AppApiInterface
  ) {}

  goBack (): void {
    this.location.back()
  }

  ngOnInit (): void {}
}
