import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ModalComponent } from '@ui/modal/modal.component'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'app-apply-grant-page',
  templateUrl: './apply-grant-page.component.html',
  styleUrls: ['./apply-grant-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyGrantPageComponent implements OnInit {
  grantId = ''
  grantForm = new FormGroup({
    team: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  @ViewChild(ModalComponent) modal?: ModalComponent;

  constructor (private route: ActivatedRoute, public contractService: ContractService) {

  }

  ngOnInit (): void {
    this.route.params.subscribe((p) => {
      this.grantId = p.entityId
    })
  }

  onSubmit () {
    this.contractService.applyForTask(this.grantId, this.grantForm.value.team, this.grantForm.value.link)
  }

  willConfirm (status: boolean) {
    console.log('willConfirm', status)
  }
}
