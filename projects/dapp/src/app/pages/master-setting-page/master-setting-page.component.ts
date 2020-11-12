import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-master-setting-page',
  templateUrl: './master-setting-page.component.html',
  styleUrls: ['./master-setting-page.component.scss']
})
export class MasterSettingPageComponent implements OnInit {
  settingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    reward: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
