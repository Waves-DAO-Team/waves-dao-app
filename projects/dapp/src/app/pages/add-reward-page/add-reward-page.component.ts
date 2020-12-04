import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'

@Component({
  selector: 'app-add-reward-page',
  templateUrl: './add-reward-page.component.html',
  styleUrls: ['./add-reward-page.component.scss']
})
export class AddRewardPageComponent implements OnInit {
  grantId: number | null = null
  public readonly grantForm = new FormGroup({
    reward: new FormControl('', Validators.required)
  })

  constructor (
    private route: ActivatedRoute,
    private location: Location,
    private disruptiveContractService: DisruptiveContractService
  ) {
  }

  ngOnInit (): void {
    this.route.params.subscribe((p) => {
      this.grantId = p.entityId
    })
  }

  goBack () {
    this.location.back()
  }

  onSubmit () {
    if (this.grantId && this.grantForm.value.reward) {
      const reward = (this.grantForm.value.reward * 100000000).toString()
      this.disruptiveContractService.addReward(this.grantId.toString(), reward).subscribe()
    }
  }
}
