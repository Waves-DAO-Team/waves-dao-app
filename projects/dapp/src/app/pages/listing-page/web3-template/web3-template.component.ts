import { Component, Input, OnInit } from '@angular/core'
import { UserDataInterface } from '@services/user/user.interface'
import { GrantsVariationType } from '@services/contract/contract.model'
import { AppApiInterface, AppConstantsInterface } from '@constants'

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

  constructor () { }

  ngOnInit (): void {
  }
}
