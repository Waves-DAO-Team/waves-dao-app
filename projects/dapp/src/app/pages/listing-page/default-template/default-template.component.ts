import { Component, Input, OnInit } from '@angular/core'
import { UserDataInterface } from '@services/user/user.interface'
import { GrantsVariationType } from '@services/contract/contract.model'
import { AppApiInterface, AppConstantsInterface } from '@constants'
import {DialogComponent} from "@ui/dialog/dialog.component";
import {ProposeGrantComponent} from "@ui/modals/propose-grant/propose-grant.component";
import {MatDialog} from "@angular/material/dialog";
import {CommonContractService} from "@services/contract/common-contract.service";

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit {
  @Input() public readonly user!: UserDataInterface;

  @Input() public readonly contract!: GrantsVariationType;

  @Input() public readonly constants!: AppConstantsInterface;

  @Input() public readonly api!: AppApiInterface;

  constructor (private dialog: MatDialog, public commonContractService: CommonContractService) { }

  ngOnInit (): void {
  }

  onProposeGrant() {
    this.dialog.open(DialogComponent, {
      data: {
        component: ProposeGrantComponent,
        params: {
          title: "DefTemplateComponent modal",
          contractService: this.commonContractService
        }
      }
    })
  }
}
