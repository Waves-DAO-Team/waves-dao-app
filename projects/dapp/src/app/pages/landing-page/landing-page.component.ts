import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'

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
    @Inject(API) public readonly api: AppApiInterface
  ) { }

  ngOnInit (): void {}

  ngOnDestroy (): void {}
}
