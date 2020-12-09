import {Component, Input, OnInit} from '@angular/core'
import {UserDataInterface} from '@services/user/user.interface'
import {GrantsVariationType} from '@services/contract/contract.model'
import {AppApiInterface, AppConstantsInterface} from '@constants'
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "@ui/dialog/dialog.component";
import {ProposeGrantComponent} from "@ui/modals/propose-grant/propose-grant.component";
import {CommunityContractService} from "@services/contract/community-contract.service";

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent implements OnInit {
  @Input() public readonly user!: UserDataInterface;

  @Input() public readonly contract!: GrantsVariationType;

  @Input() public readonly constants!: AppConstantsInterface;

  @Input() public readonly api!: AppApiInterface;

  constructor(private dialog: MatDialog, public communityContractService: CommunityContractService) {
  }

  ngOnInit(): void {
  }

  onProposeGrant() {
    this.dialog.open(DialogComponent, {
      data: {
        component: ProposeGrantComponent,
        params: {
          title: "Web3TemplateComponent modal",
          contractService: this.communityContractService,
          submitBtnText: "Web3TemplateComponent Apply btn"
        }
      }
    })
  }
}
