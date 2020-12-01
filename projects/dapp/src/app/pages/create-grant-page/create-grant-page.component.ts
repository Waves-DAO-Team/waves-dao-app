import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ContractService } from '@services/contract/contract.service'
import { CurrencyPipe, Location } from '@angular/common'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'app-create-grant-page',
  templateUrl: './create-grant-page.component.html',
  styleUrls: ['./create-grant-page.component.scss'],
  providers: [CurrencyPipe]

})
export class CreateGrantPageComponent {
  grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (private contractService: ContractService, private location: Location, public userService: UserService) {}

  onSubmit () {
    let reward = this.grantForm.value.reward
    if (reward.length === 1) {
      reward *= 100000000
    } else {
      reward = reward.replace('.', '')
      reward *= 1000000
    }
    console.log('reward: ', reward)
    this.contractService.addTask(this.grantForm.value.name, reward, this.grantForm.value.link)
  }

  goBack (): void {
    this.location.back()
  }
}
