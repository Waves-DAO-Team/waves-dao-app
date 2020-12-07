import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '@services/user/user.service'
import { Location } from '@angular/common'
import { CommonContractService } from '@services/contract/common-contract.service'

@Component({
  selector: 'app-master-setting-page',
  templateUrl: './master-setting-page.component.html',
  styleUrls: ['./master-setting-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterSettingPageComponent implements OnInit, OnDestroy {
  data$ = this.userService.data
    .subscribe((newData) => {
      this.cdr.markForCheck()
    })

  workGroupForm = new FormGroup({
    workGroup: new FormControl('', Validators.required)
  })

  DAOMemberForm = new FormGroup({
    DAOMember: new FormControl('', Validators.required)
  })

  public activeTab: 'dao' | 'wg' = 'dao';

  constructor (public userService: UserService,
               private commonContractService: CommonContractService,
               private location: Location,
               private cdr: ChangeDetectorRef
  ) { }

  ngOnInit (): void {
  }

  setTab (tab: 'dao' | 'wg') {
    this.activeTab = tab
  }

  submitDAO () {
    const DAOMemberAddress = this.DAOMemberForm.value.DAOMember
    this.commonContractService.addDAOMember(DAOMemberAddress)
      .subscribe((data) => {})

    // Reset form immediately
    this.DAOMemberForm.reset()
  }

  submitWG () {
    const workGroupAddress = this.workGroupForm.value.workGroup
    this.commonContractService.addGroupMember(workGroupAddress)
      .subscribe(() => {})

    // Reset form immediately
    this.workGroupForm.reset()
  }

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy (): void {
    this.data$.unsubscribe()
  }
}
