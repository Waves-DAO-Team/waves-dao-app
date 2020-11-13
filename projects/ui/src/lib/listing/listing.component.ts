import {Component, Inject, OnInit} from '@angular/core'
import {GRANTS, GRANTS_PROVIDERS} from './listing.providers'
import {ContractGrantModel} from '@services/contract/contract.model'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {UserService} from '@services/user/user.service'
import {RoleEnum} from '@services/user/user.interface'
import {GrantStatusEnum} from '@services/../interface'
import {tap} from "rxjs/operators";

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnInit {
  RoleEnum = RoleEnum
  GrantStatusEnum = GrantStatusEnum
  selectedTagName: string = ''
  listGrantStatuses: string[] = []
  listGrantStatuses$ = this.grants.data$.pipe(
    tap(
      (grants) => {
        this.listGrantStatuses = []
        grants.forEach((grant) => {
          let status: string = grant.status?.value === undefined ? 'no_status' : grant.status?.value
          if (!(this.listGrantStatuses.includes(status))) {
            this.listGrantStatuses.push(status)
          }
        })
      }
    )
  ).subscribe()


  constructor(
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantModel[]>,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {}

  trackByFn(index: number) {
    return index
  }

  selectedTag($event: string) {
    this.selectedTagName = $event
  }

  isCanShowByTag(status: string, selectedTagName: string) {
    status = !status ? 'no_status' : status
    if(status === selectedTagName || selectedTagName === '') {
      return true
    }
    return false
  }
}
