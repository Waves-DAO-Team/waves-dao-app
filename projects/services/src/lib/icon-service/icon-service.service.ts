import { Injectable } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

export enum Icons {
  Like = 'like',
  Dislike = 'dislike'
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  constructor (
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons (): void {
    this.loadIcons(Object.values(Icons), '../assets/svg/icons')
  }

  private loadIcons (iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`))
    })
  }
}
