import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core'
import { GRANTS, GRANTS_PROVIDERS } from './listing.providers'
import { ContractGrantModel } from '@services/contract/contract.model'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '@services/../interface'
import { tap } from 'rxjs/operators'
import { ContractService } from '@services/contract/contract.service'
import { TeamService } from '@services/team/team.service'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnInit {

  grantsVariationActive = '1'
  RoleEnum = RoleEnum
  GrantStatusEnum = GrantStatusEnum
  selectedTagName = ''
  listGrantStatuses: string[] = []
  listGrantStatuses$ = this.grants.data$.pipe(
    tap(
      (grants) => {
        this.listGrantStatuses = []
        this.listGrantStatuses.push('all')
        grants.forEach((grant) => {
          const status: string = grant.status?.value === undefined ? GrantStatusEnum.noStatus : grant.status?.value
          if (!(this.listGrantStatuses.includes(status))) {
            this.listGrantStatuses.push(status)
          }
        })
      }
    )
  ).subscribe()

  grants$ = this.userService.data.subscribe(() => {
    this.cdr.markForCheck()
  })

  constructor (
    public cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantModel[]>,
    public userService: UserService,
    public contractService: ContractService,
    public teamService: TeamService
  ) {

  }

  ngOnInit (): void {}

  trackByFn (index: number) {
    return index
  }

  selectedTag ($event: string) {
    this.selectedTagName = $event
  }

  isCanShowByTag (status: string, selectedTagName: string) {
    if (selectedTagName === 'all') {
      return true
    }
    status = !status ? 'no_status' : status
    if (status === selectedTagName || selectedTagName === '') {
      return true
    }
    return false
  }
}
