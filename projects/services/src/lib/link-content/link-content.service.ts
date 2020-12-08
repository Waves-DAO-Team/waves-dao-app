import { Injectable } from '@angular/core'
import { MainResponseInterface, ReposResponseInterface } from '@services/link-content/link-content.interface'
import { EMPTY, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { catchError, map, switchMap, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LinkContentService {
  constructor (private readonly http: HttpClient) {}

  getContent (link: string) {
    return of(link).pipe(
      map((url: string) => {
        if (!url) {
          throw new Error('Link to md file is not defined')
        }

        return {
          isFile: /\.md$/.test(url),
          isGH: url.includes('github.com'),
          isIssues: url.includes('issues'),
          separatorCounter: url.split('/').length,
          url
        }
      }),
      switchMap((data) => {
        console.log('DATA', data)
        if (!(data.isGH && (data.isFile || data.isIssues || data.separatorCounter === 5))) {
          throw new Error('Conditions is not equal a link')
        }

        if (data.isGH && data.isIssues) {
          return this.http.get<ReposResponseInterface>(`https://api.github.com/repos${(new URL(data.url)).pathname}`)
        } else if (data.isFile) {
          const path = (new URL(data.url)).pathname
          return this.http.request('get', `https://raw.githubusercontent.com/${path.replace('/blob', '')}`, {
            responseType: 'text'
          }).pipe(catchError((e) => of('')))
        } else {
          return this.http.get<MainResponseInterface>(`https://api.github.com/repos${(new URL(data.url)).pathname}/contents/README.md`)
            .pipe(catchError((e) => of('')))
        }
      }),
      map(
        (data: ReposResponseInterface | MainResponseInterface | string) => {
          if (typeof data === 'string') {
            return data
          }

          if ('body' in data) {
            return data.body
          } else if ('content' in data) {
            return atob(data.content)
          }
        }
      ),
      take(1),
      catchError((error) => {
        console.log('File by link ' + link + ' is not be a parsed', error)
        return EMPTY
      })
    )
  }

  getPrepareContent (link: string) {
    return this.getContent(link).pipe(
      map((content) => {
        return content?.replace(/^# .+\n/g, '')
      })
    )
  }
}
