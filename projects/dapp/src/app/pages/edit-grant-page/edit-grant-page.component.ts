import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'app-edit-grant-page',
  templateUrl: './edit-grant-page.component.html',
  styleUrls: ['./edit-grant-page.component.scss']
})
export class EditGrantPageComponent implements OnInit {
  grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    // tags: new FormControl('', Validators.required),
    // description: new FormControl('', Validators.required)
  })

  grantId = '';
  constructor (private route: ActivatedRoute, private contractService: ContractService) {}

  ngOnInit (): void {
    this.route.params.subscribe((p) => {
      this.grantId = p.entityId
    })
  }

  onSubmit () {
    console.log('form', this.grantId, this.grantForm.value.reward)
    this.contractService.addTaskDetails(this.grantId, this.grantForm.value.reward)
  }
}
