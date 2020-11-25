import { Injectable } from '@angular/core'
import { PopupService } from '@services/popup/popup.service'
import {
  LinkContentDataInterface, MainResponseInterface,
  ReposResponseInterface
} from '@services/link-content/link-content.interface'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LinkContentService {
  bodyMd = new Subject()
  lastUr = ''
  gitHubRawMdUrl = ''
  data: LinkContentDataInterface = {
    response: null,
    apiUrl: '',
    url: null,
    isGitHub: false,
    isGitHubIssues: false,
    isGitHubMain: false,
    responseMani: null,
    urlRawMd: ''
  }

  constructor (private popupService: PopupService, private readonly http: HttpClient) {
    this.bodyMd.subscribe()
  }

  public init (url: string): void {
    if (this.lastUr !== url) {
      if (this.validURL(url)) {
        this.reset()
        this.data.url = new URL(url)
        if (this.isGitHubRawMd(url)) {
          this.gitHubRawMdUrl = url
        } else if (this.isGitHub(url)) {
          this.getBodyMd(url)
        }
      } else {
        this.popupService.add('url is not valid', 'LinkContentService init')
      }
      this.lastUr = url
    }
  }

  private isGitHubRawMd (url: string): boolean {
    return url.includes('githubusercontent') && url.includes('raw')
  }

  private isGitHub (url: string): boolean {
    return url.includes('github.com')
  }

  getBodyMd (url: string) {
    const urlObj = new URL(url)
    if (urlObj.pathname.split('/').length === 3 && this.isGitHubRawMd(url)) {
      this.gitHubRawMdUrl = `https://raw.githubusercontent.com${urlObj.pathname}/master/README.md`
    } else if (urlObj.pathname.split('/').length === 5 && urlObj.pathname.toLowerCase().includes('issues')) {
      this.data.apiUrl = `https://api.github.com/repos${this.data.url?.pathname}`
      this.http.get<ReposResponseInterface>(this.data.apiUrl).subscribe((e: ReposResponseInterface) => {
        this.data.response = e
        this.bodyMd.next(e.body)
      })
    } else if (urlObj.pathname.split('/').length === 3) {
      this.data.apiUrl = `https://api.github.com/repos${this.data.url?.pathname}/contents/README.md`

      /* eslint-disable handle-callback-err */
      this.http.get<MainResponseInterface>(this.data.apiUrl).subscribe((e: MainResponseInterface) => {
        this.data.response = e
        this.bodyMd.next(atob(e.content))
      },
      error => {
        this.data.apiUrl = `https://api.github.com/repos${this.data.url?.pathname}/contents/readme.md`
        this.http.get<MainResponseInterface>(this.data.apiUrl).subscribe((e: MainResponseInterface) => {
          this.data.response = e
          this.bodyMd.next(atob(e.content))
        })
      }
      )
    }
  }

  private reset () {
    this.gitHubRawMdUrl = ''
    this.data = {
      response: null,
      apiUrl: '',
      url: null,
      isGitHub: false,
      isGitHubIssues: false,
      isGitHubMain: false,
      responseMani: null,
      urlRawMd: ''
    }
  }

  private validURL (str: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    return !!pattern.test(str)
  }
}
