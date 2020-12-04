import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CurrencyPipe, Location } from '@angular/common'
import { UserService } from '@services/user/user.service'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'

@Component({
  selector: 'app-create-grant-page',
  templateUrl: './create-grant-page.component.html',
  styleUrls: ['./create-grant-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe]
})
export class CreateGrantPageComponent {
  public readonly grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (private disruptiveContractService: DisruptiveContractService, private location: Location, public userService: UserService) {}

  onSubmit () {
    this.disruptiveContractService.addTask(this.grantForm.value.name, this.grantForm.value.link).subscribe()
  }

  goBack (): void {
    this.location.back()
  }
}
