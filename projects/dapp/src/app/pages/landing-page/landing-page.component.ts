import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'
import {LinkContentModule} from '@services/link-content/link-content.module'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit, OnDestroy {
  constructor (
    public cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    public linkContent: LinkContentModule,
    @Inject(API) public readonly api: AppApiInterface, // eslint-disable-line
  ) { }

  ngOnInit (): void {}

  ngOnDestroy (): void {
  }
}
