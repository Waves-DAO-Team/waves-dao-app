import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core'
import {Location} from '@angular/common'
import {UserService} from '@services/user/user.service'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'
import {StaticService} from '@services/static/static.service'
import {DialogComponent} from "@ui/dialog/dialog.component";
import {ApplyComponent} from "@ui/modals/apply/apply.component";
import {SubmitCallBackApplyArg} from "@ui/dialog/dialog.tokens";
import {take} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersPageComponent {
  public readonly user$ = this.userService.data;

  constructor(
    private dialog: MatDialog,
    private location: Location,
    public userService: UserService,
    public staticService: StaticService,
    public cdr: ChangeDetectorRef,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  goBack(): void {
    this.location.back()
  }

  openAddDAOModal(): void {
    // const dialog = this.dialog.open(DialogComponent, {
    //   data: {
    //     component: ApplyComponent,
    //     params: {
    //       grant: this.grant,
    //       submitCallBack: (data: SubmitCallBackApplyArg) => {
    //         this.disruptiveContractService.applyForTask(data.id, data.team, data.link)
    //           .pipe(take(1))
    //           .subscribe(() => {
    //             dialog.close()
    //             this.cdr.markForCheck()
    //           })
    //       }
    //     }
    //   }
    // })
  }

  openAddWGModal() {
    console.log('+++')
  }
}
