import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ContractService } from '@services/contract/contract.service'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'app-edit-grant-page',
  templateUrl: './edit-grant-page.component.html',
  styleUrls: ['./edit-grant-page.component.scss']
})
export class EditGrantPageComponent implements OnInit {
  grantForm = new FormGroup({
    name: new FormControl(''),
    reward: new FormControl('')
    // tags: new FormControl('', Validators.required),
    // description: new FormControl('', Validators.required)
  })

  grantId = '';
  constructor (public userService: UserService, private route: ActivatedRoute, private contractService: ContractService, private location: Location) {}

  ngOnInit (): void {
    this.route.params.subscribe((p) => {
      this.grantId = p.entityId
    })
  }

  onSubmit () {
    let reward = this.grantForm.value.reward
    if (reward.length === 1) {
      reward *= 100000000
    } else {
      reward = reward.replace('.', '')
      reward *= 1000000
    }
    this.contractService.addTask(this.grantForm.value.name, reward, this.grantForm.value.link)
  }

  goBack () {
    this.location.back()
  }
}
