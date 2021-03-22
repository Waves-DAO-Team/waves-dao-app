import {Injectable} from '@angular/core'
import {catchError, take} from 'rxjs/operators'
import {EMPTY} from 'rxjs'
import {HttpClient} from '@angular/common/http'

interface IGithubResponse {
  body: string
}

@Injectable({
  providedIn: 'root'
})
export class HashService {

  private cache: { [s: string]: boolean | null } = {}

  constructor (private readonly http: HttpClient) {
  }

  public init (url: string): Promise<string> {
    if (!this.isGithubUrl(url)) {
      return new Promise((resolve) => {
        resolve('')
      })
    }
    return new Promise((resolve) => {
      this.getHtml(this.transformUrl(url)).subscribe((e) => {
          resolve(this.getHash(e.body).toString())
        }
      )
    })
  }

  private transformUrl (url: string) {
    const urlObj = new URL(url)
    if (urlObj.host === 'github.com') {
      const urlObj = new URL(url)
      return `${urlObj.protocol}//api.${urlObj.host}/repos${urlObj.pathname}`
    }
    return url
  }

  private isGithubUrl (url: string): boolean {
    if (url.length < 7 || !this.validURL(url)) {
      return false
    }
    const urlObj = new URL(url)
    if (
      (urlObj.host !== 'api.github.com' && urlObj.host !== 'github.com')
      && urlObj.pathname.split('/').length < 8
    ) {
      return false
    }
    return true
  }


  private getHtml (url: string) {
    return this.http.get<IGithubResponse>(url, {
      headers: {accept: 'application/json; charset=utf-8'}
    }).pipe(
      take(1),
      catchError(() => EMPTY)
    )
  }

  private getHash (str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed //eslint-disable-line no-bitwise
    let h2 = 0x41c6ce57 ^ seed //eslint-disable-line no-bitwise
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i)
      h1 = Math.imul(h1 ^ ch, 2654435761) //eslint-disable-line no-bitwise
      h2 = Math.imul(h2 ^ ch, 1597334677) //eslint-disable-line no-bitwise
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909) //eslint-disable-line no-bitwise
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909) //eslint-disable-line no-bitwise
    return 4294967296 * (2097151 & h2) + (h1 >>> 0) //eslint-disable-line no-bitwise
  }

  validURL (str: string): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    return !!pattern.test(str)
  }


  public isHashValid (hash: string, link: string): Promise<boolean | null> {
    if (this.cache[hash]) {
      return new Promise((resolve) => {
        resolve(this.cache[hash])
      })
    } else {
      return new Promise((resolve) => {
        if (!!hash) {
          this.getHtml(this.transformUrl(link)).subscribe((e) => {
              resolve(this.getHash(e.body).toString() === hash)
              this.cache[hash] = this.getHash(e.body).toString() === hash
            }
          )
        } else {
          resolve(null)
          this.cache[hash] = null
        }
      })
    }
  }

}
