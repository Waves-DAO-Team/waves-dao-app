import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { CONTRACT, ENTITY, ENTITY_PAGE_PROVIDERS } from '@pages/entity-page/entity-page.providers'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import {
  ContractGrantModel
} from '@services/contract/contract.model'
import { Location } from '@angular/common'
import { GrantsVariationType } from '@services/static/static.model'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ENTITY_PAGE_PROVIDERS
})
export class EntityPageComponent implements OnInit, OnDestroy {
  constructor (
    private readonly location: Location, // eslint-disable-line
    @Inject(CONTRACT) public readonly contract: LoadingWrapperModel<GrantsVariationType>, // eslint-disable-line
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface, // eslint-disable-line
    @Inject(ENTITY) public entity: LoadingWrapperModel<ContractGrantModel>, // eslint-disable-line
    private readonly http: HttpClient
  ) {}

  ngOnInit (): void {
    // const linkChecker = new LinkChecker( this.http, 'https://github.com/vlzhr/grants-program/issues/15')
    // linkChecker.result$.subscribe( e => console.log('====', e))
    // linkChecker.onDestroy()
  }

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy (): void {
    this.entity.destroy()
  }
}
