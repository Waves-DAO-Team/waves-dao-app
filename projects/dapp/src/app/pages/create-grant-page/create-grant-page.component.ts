import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ContractService } from '@services/contract/contract.service'
import { debounce } from 'rxjs/operators'
import { timer } from 'rxjs'
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-create-grant-page',
  templateUrl: './create-grant-page.component.html',
  styleUrls: ['./create-grant-page.component.scss'],
  providers: [CurrencyPipe]

})
export class CreateGrantPageComponent {
  grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    reward: new FormControl('100000000', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (private contractService: ContractService) { }

  onSubmit () {
    // console.log(this.grantForm.value)
    this.contractService.addTask(this.grantForm.value.name, this.grantForm.value.reward, this.grantForm.value.link)
  }
}
