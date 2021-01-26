import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  isDevMode,
  OnInit,
  PLATFORM_ID, PlatformRef,
  Renderer2
} from '@angular/core'
import { DOCUMENT, isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'ui-dev-grid',
  templateUrl: './dev-grid.component.html',
  styleUrls: ['./dev-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevGridComponent implements OnInit {
  @HostBinding('class.dev-mode') devPageMode: boolean = isDevMode()
  @Input() enabled: boolean
  public storageKey = 'dev-grid'
  public isShow = false
  public isActive = false
  private readonly cssClass = 'dev-mode'

  private readonly html: HTMLElement

  constructor (
    public renderer: Renderer2,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: PlatformRef,
    public cdr: ChangeDetectorRef
  ) {
    this.html = document.documentElement
    this.enabled = isPlatformBrowser(platformId)
  }

  private getLocal (name: string = this.storageKey): string | null {
    if (!this.enabled) {
      return null
    }

    return window.localStorage.getItem(name) || null
  }

  private setLocal (value: string, name: string = this.storageKey): void {
    if (!this.enabled) {
      return
    }
    window.localStorage.setItem(name, value)
  }

  public deleteLocal (name: string = this.storageKey): void {
    if (!this.enabled) {
      return
    }
    if (this.getLocal(name)) {
      window.localStorage.removeItem(name)
    }
  }

  ngOnInit () {
    this.devPageMode = isDevMode()
    if (this.enabled && this.devPageMode) {
      setTimeout(() => {
        this.isShow = true
        this.cdr.markForCheck()
      })
      if (this.getLocal() !== null) {
        this.renderer.addClass(this.html, this.cssClass)
        this.isActive = true
      } else {
        this.renderer.removeClass(this.html, this.cssClass)
        this.isActive = false
      }
    }
  }

  toggleClassBody () {
    if (!this.enabled) {
      return
    }
    const hasClass = this.html.classList.contains(this.cssClass)
    if (hasClass) {
      this.renderer.removeClass(this.html, this.cssClass)
      this.deleteLocal(this.storageKey)
      this.isActive = false
    } else {
      this.renderer.addClass(this.html, this.cssClass)
      this.setLocal('true', this.storageKey)
      this.isActive = true
    }
  }
}
