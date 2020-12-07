import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import { Location } from '@angular/common'
import { ABOUT_PAGE_PROVIDERS, CONTRACT } from './about-page.provider'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { GrantsVariationType } from '@services/contract/contract.model'

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ABOUT_PAGE_PROVIDERS
})
export class AboutPageComponent implements OnInit, OnDestroy {
  constructor (
      private readonly location: Location,
      @Inject(CONTRACT) public readonly contract: LoadingWrapperModel<GrantsVariationType>
  ) {}

  ngOnInit (): void {}

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy () {
    this.contract.destroy()
  }
}
