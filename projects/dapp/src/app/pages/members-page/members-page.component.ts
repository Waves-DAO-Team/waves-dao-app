import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'
import { API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface } from '@constants'
import { StaticService } from '@services/static/static.service'

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
      public staticService: StaticService,
      public cdr: ChangeDetectorRef,
      @Inject(API) public readonly api: AppApiInterface,
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}

  goBack (): void {
    this.location.back()
  }

  ngOnInit (): void {}
}
