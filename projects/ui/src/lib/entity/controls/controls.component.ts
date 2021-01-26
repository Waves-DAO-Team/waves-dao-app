import {
  Component,
  Input,
  ChangeDetectionStrategy, TemplateRef
} from '@angular/core'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'ui-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent {
  @Input() controlsTemplate: TemplateRef<Component> | undefined

  constructor (
    public userService: UserService
  ) {
  }
}
