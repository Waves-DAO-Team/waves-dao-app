import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '@services/user/user.service'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'app-master-setting-page',
  templateUrl: './master-setting-page.component.html',
  styleUrls: ['./master-setting-page.component.scss']
})
export class MasterSettingPageComponent implements OnInit {
  workGroupForm = new FormGroup({
    workGroup: new FormControl('', Validators.required)
  })

  DAOMemberForm = new FormGroup({
    DAOMember: new FormControl('', Validators.required)
  })

  public activeTab: 'dao' | 'wg' = 'dao';

  constructor (public userService: UserService, private contractService: ContractService) { }

  ngOnInit (): void {
  }

  setTab (tab: 'dao' | 'wg') {
    this.activeTab = tab
  }

  submitDAO () {
    console.log('submitDAO', this.DAOMemberForm.value.DAOMember)
    this.contractService.addDAOMember(this.DAOMemberForm.value.DAOMember)
  }

  submitWG () {
    console.log('submitWG', this.workGroupForm.value.workGroup)
    this.contractService.addGroupMember(this.workGroupForm.value.workGroup)
  }
}
