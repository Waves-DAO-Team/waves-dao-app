import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild
} from '@angular/core'
import { Router, Event, NavigationStart } from '@angular/router'
import { COMMON_LAYOUT_FOOTER, COMMON_LAYOUT_HEADER, provideCommonLayout } from './common-layout.provider'
import {
  CommonLayoutComponentModel,
  CommonLayoutFooterExtensionInterface,
  CommonLayoutInterface
} from './common-layout.interface'
import { filter, takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'ui-common-layout',
  templateUrl: './common-layout.component.html',
  // eslint-disable-next-line
  providers: [provideCommonLayout(CommonLayoutComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonLayoutComponent implements OnInit, OnDestroy, CommonLayoutInterface {
  public footerExtension?: TemplateRef<CommonLayoutComponentModel>
  public singlePageLayout = false
  public secondLevelOnNavigation = false

  @ViewChild('content', { read: ElementRef, static: true }) private readonly layoutContentRef: ElementRef<HTMLElement> | null = null

  private readonly destroyed$ = new Subject()

  constructor (
    private readonly router: Router,
    @Inject(COMMON_LAYOUT_HEADER) public headerComponent: Type<CommonLayoutComponentModel>,
    @Inject(COMMON_LAYOUT_FOOTER) public footerComponent: Type<CommonLayoutComponentModel>
  ) {}

  public ngOnInit (): void {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationStart),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.dispose()
      })
  }

  public ngOnDestroy (): void {
    this.dispose()
    this.destroyed$.next()
  }

  public onActivateComponent (component: CommonLayoutFooterExtensionInterface): void {
    if (component.uiFooterExtensionTemplate) {
      this.footerExtension = component.uiFooterExtensionTemplate
      return
    }
    this.footerExtension = undefined
  }

  public hasLayoutContent (): boolean {
    return !!this.layoutContentRef
  }

  private dispose (): void {
    this.singlePageLayout = false
    this.footerExtension = undefined
  }
}
