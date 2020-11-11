import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { UserService } from '@services/user/user.service'
import {ModalComponent} from "@ui/modal/modal.component";

@Component({
  selector: 'app-apply-grant-page',
  templateUrl: './apply-grant-page.component.html',
  styleUrls: ['./apply-grant-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplyGrantPageComponent implements OnInit {
  grantId = 0
  grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailOrPhone: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    documentUrl: new FormControl('', Validators.required)
  })

  @ViewChild(ModalComponent) child?: ModalComponent;


  constructor (private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit (): void {
    this.route.params.subscribe((p) => {
      this.grantId = p.entityId
    })
  }

  onSubmit () {
    if (this.grantForm.valid) {
      this.child?.openModal()
    }
  }

  willConfirm(status: boolean) {
    console.log('willConfirm', status)
  }
}
