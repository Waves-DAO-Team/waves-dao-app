import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-master-setting-page',
  templateUrl: './master-setting-page.component.html',
  styleUrls: ['./master-setting-page.component.scss']
})
export class MasterSettingPageComponent implements OnInit {
  settingForm = new FormGroup({
    workGroup: new FormControl('', Validators.required),
    DAOMember: new FormControl('', Validators.required)
  })

  constructor () { }

  ngOnInit (): void {
  }
}
