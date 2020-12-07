import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { Router } from '@angular/router'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { GrantsVariationType } from '@services/contract/contract.model'
import { CONTRACT, CREATE_GRANT_PAGE_PROVIDERS } from '@pages/create-grant-page/create-grant-page.provider'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { route } from '@libs/pipes/routes.lib'
import { take } from 'rxjs/operators'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'app-create-grant-page',
  templateUrl: './create-grant-page.component.html',
  styleUrls: ['./create-grant-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: CREATE_GRANT_PAGE_PROVIDERS
})
export class CreateGrantPageComponent {
  public readonly grantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor (
      private disruptiveContractService: DisruptiveContractService,
      private location: Location,
      public userService: UserService,
      private router: Router,
      private contractService: ContractService,
      @Inject(CONTRACT) public readonly contract: LoadingWrapperModel<GrantsVariationType>,
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}

  onSubmit () {
    this.disruptiveContractService.addTask(this.grantForm.value.name, this.grantForm.value.link)
      .pipe(take(1))
      .subscribe((data) => {
        this.contractService.refresh().subscribe((update) => {
          console.log('Contacts state', update)
          setTimeout(() => {
            this.goToEntity(data.id)
          })
        })
      })
    this.grantForm.reset()
  }

  // Todo Проверить обвязку для информации о контракте
  goToEntity (entityId: string): void {
    this.contract.data$
      .pipe(take(1))
      .subscribe((cntr) => {
        this.router.navigate([route(this.constants.routes.entity, [cntr.name, entityId])])
      })
  }

  goBack (): void {
    this.location.back()
  }
}
