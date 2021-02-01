import { Injectable } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly icons = ['like', 'dislike']

  constructor (
    private readonly matIconRegistry: MatIconRegistry, // eslint-disable-line
    private readonly domSanitizer: DomSanitizer // eslint-disable-line
  ) { }

  public registerIcons (): void {
    this.loadIcons(Object.values(this.icons), '../assets/svg/icons')
  }

  private loadIcons (iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`))
    })
  }
}
