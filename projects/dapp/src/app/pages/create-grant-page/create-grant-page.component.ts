import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ContractService } from '@services/contract/contract.service'
import { CurrencyPipe, Location } from '@angular/common'
import { UserService } from '@services/user/user.service'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'

@Component({
  selector: 'app-create-grant-page',
  templateUrl: './create-grant-page.component.html',
  styleUrls: ['./create-grant-page.component.scss'],
  providers: [CurrencyPipe]
})
export class CreateGrantPageComponent {
  public readonly grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (private disruptiveContractService: DisruptiveContractService, private location: Location, public userService: UserService) {}

  onSubmit () {
    // TODO Делаем две формы. Убираем вознаграждение в этой форме
    // let reward = this.grantForm.value.reward
    // if (reward.length === 1) {
    //   reward *= 100000000
    // } else {
    //   reward = reward.replace('.', '')
    //   reward *= 1000000
    // }
    // console.log('reward: ', reward)

    this.disruptiveContractService.addTask(this.grantForm.value.name, this.grantForm.value.link)
  }

  goBack (): void {
    this.location.back()
  }
}
