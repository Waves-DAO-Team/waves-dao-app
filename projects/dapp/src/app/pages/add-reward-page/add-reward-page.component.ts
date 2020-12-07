import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit
} from '@angular/core'
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { take } from 'rxjs/operators'
import { route } from '@libs/pipes/routes.lib'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { GrantsVariationType } from '@services/contract/contract.model'
import { ADD_REWARD_PAGE_PROVIDERS, CONTRACT } from './add-reward-page.provider'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'

@Component({
  selector: 'app-add-reward-page',
  templateUrl: './add-reward-page.component.html',
  styleUrls: ['./add-reward-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ADD_REWARD_PAGE_PROVIDERS
})
export class AddRewardPageComponent implements OnInit {
  grantId: string | null = null

  public readonly grantForm = new FormGroup({
    reward: new FormControl('', Validators.required)
  })

  constructor (
    private routePath: ActivatedRoute,
    private location: Location,
    private disruptiveContractService: DisruptiveContractService,
    private router: Router,
    @Inject(CONTRACT) public readonly contract: LoadingWrapperModel<GrantsVariationType>,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  ngOnInit (): void {
    this.routePath.params.subscribe((p) => {
      this.grantId = p.entityId
    })
  }

  // Todo Проверить обвязку для информации о контракте
  goToEntity (entityId: string): void {
    this.contract.data$
      .pipe(take(1))
      .subscribe((cntr) => {
        this.router.navigate([route(this.constants.routes.entity, [cntr.name, entityId])])
      })
  }

  goBack () {
    this.location.back()
  }

  onSubmit () {
    if (this.grantId && this.grantForm.value.reward) {
      const reward = (this.grantForm.value.reward * 100000000).toString()
      this.disruptiveContractService.addReward(this.grantId.toString(), reward).subscribe()

      this.goToEntity(this.grantId)
    }
  }
}
