import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '@services/user/user.service'
import { ContractService } from '@services/contract/contract.service'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'

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

  constructor (public userService: UserService, private disruptiveContractService: DisruptiveContractService) { }

  ngOnInit (): void {
  }

  setTab (tab: 'dao' | 'wg') {
    this.activeTab = tab
  }

  submitDAO () {
    console.log('submitDAO', this.DAOMemberForm.value.DAOMember)
    this.disruptiveContractService.addDAOMember(this.DAOMemberForm.value.DAOMember)
  }

  submitWG () {
    console.log('submitWG', this.workGroupForm.value.workGroup)
    this.disruptiveContractService.addGroupMember(this.workGroupForm.value.workGroup)
  }
}
