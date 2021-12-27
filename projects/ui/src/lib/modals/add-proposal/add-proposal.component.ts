import {Component, Inject} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {API, AppApiInterface} from '@constants'
import {DIALOG_DATA, DialogParams} from '@ui/dialog/dialog.tokens'
import {HashService} from '@services/hash/hash.service'

@Component({
  selector: 'ui-add-proposal',
  templateUrl: './add-proposal.component.html',
  styleUrls: ['./add-proposal.component.scss']
})
export class AddProposalComponent {

  public readonly form = new FormGroup({
    ticker: new FormControl('', Validators.required),
    tokenId: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
  })

  constructor (
    public hashService: HashService,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(DIALOG_DATA) public params: DialogParams
  ) { }

  onSubmit (): void {
    this.params.dialogRef.close()
    const link = this.form.controls.link.value
    this.hashService.init(link)  // eslint-disable-line @typescript-eslint/no-floating-promises
      .then((hash: string = '') => {
        if (this.params.submitCallBack) {
          this.params.submitCallBack({
            ticker: this.form.controls.ticker.value,
            tokenId: this.form.controls.tokenId.value,
            description: this.form.controls.description.value,
            email: this.form.controls.email.value,
            link: this.form.controls.link.value,
            logo: this.form.controls.logo.value,
            hash,
          })
        }
      })
  }

  closeModal (): void {
    this.params.dialogRef.close()
  }

}
