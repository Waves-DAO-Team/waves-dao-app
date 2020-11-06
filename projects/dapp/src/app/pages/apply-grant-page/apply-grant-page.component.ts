import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-apply-grant-page',
  templateUrl: './apply-grant-page.component.html',
  styleUrls: ['./apply-grant-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyGrantPageComponent implements OnInit {
  grantId: number = 0;
  grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailOrPhone: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    documentUrl: new FormControl('', Validators.required)
  });

  constructor (private route: ActivatedRoute) {

  }

  ngOnInit (): void {
    this.route.params.subscribe((p) => {
      this.grantId = p.entityId
    })
  }

  onSubmit () {
    console.log('onSubmit', this.grantForm.valid)
  }
}
