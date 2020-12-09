import { Component, Input, OnInit } from '@angular/core'
import { UserDataInterface } from '@services/user/user.interface'
import { GrantsVariationType } from '@services/contract/contract.model'
import { AppApiInterface, AppConstantsInterface } from '@constants'

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

  constructor () { }

  ngOnInit (): void {
  }
}
