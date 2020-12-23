import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Inject, ChangeDetectorRef, Output, EventEmitter, TemplateRef
} from '@angular/core'
import {UserService} from '@services/user/user.service'
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service'
import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {
  GrantStatusEnum,
  GrantsVariationType
} from '@services/static/static.model'
import {MatDialog} from '@angular/material/dialog';
import {CommunityContractService} from '@services/contract/community-contract.service';

@Component({
  selector: 'ui-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent {

  @Input() controlsTemplate: TemplateRef<Component> | undefined;

  constructor (
    public userService: UserService
  ) {
  }

}
