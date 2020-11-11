import { Component, Inject, OnInit } from '@angular/core'
import { GRANTS, GRANTS_PROVIDERS } from './listing.providers'
import { ContractGrantModel } from '@services/contract/contract.model'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '@services/../interface'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnInit {
  RoleEnum = RoleEnum
  GrantStatusEnum = GrantStatusEnum

  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantModel[]>,
      public userService: UserService
  ) { }

  ngOnInit (): void {}

  trackByFn (index: number) {
    return index
  }
}
