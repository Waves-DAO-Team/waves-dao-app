import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'app-create-grant-page',
  templateUrl: './create-grant-page.component.html',
  styleUrls: ['./create-grant-page.component.scss']
})
export class CreateGrantPageComponent implements OnInit {
  grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor (private contractService: ContractService) { }

  ngOnInit (): void {
  }

  onSubmit () {
    // console.log('form', this.grantForm.value.name)
    this.contractService.addTask(this.grantForm.value.name, this.grantForm.value.reward)
  }
}
