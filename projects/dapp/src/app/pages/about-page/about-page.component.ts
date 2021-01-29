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
import { LinkContentService } from '@services/link-content/link-content.service'
import { switchMap } from 'rxjs/operators'
import { GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ABOUT_PAGE_PROVIDERS
})
export class AboutPageComponent implements OnInit, OnDestroy {
  public readonly content$ = this.contract.data$.pipe(
    switchMap((contractInfo) => this.linkContentService.getContent(contractInfo.about))
  )

  constructor (
    private readonly location: Location, // eslint-disable-line
    public linkContentService: LinkContentService, // eslint-disable-line
    @Inject(CONTRACT) public readonly contract: LoadingWrapperModel<GrantsVariationType> // eslint-disable-line
  ) {}

  ngOnInit (): void {}

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy (): void {
    this.contract.destroy()
  }
}
