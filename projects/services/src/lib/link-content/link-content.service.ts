import { Injectable, isDevMode } from '@angular/core'
import { MainResponseInterface, ReposResponseInterface } from '@services/link-content/link-content.interface'
import {EMPTY, Observable, of} from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { catchError, filter, map, switchMap, take } from 'rxjs/operators'

interface LinkDataModel {
  isFile: boolean
  isGH: boolean
  isIssues: boolean
  separatorCounter: number
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class LinkContentService {
  constructor (private readonly http: HttpClient) {
  }

  getContent (link: string): Observable<string | undefined> {
    return of(link).pipe(
      filter(el => el !== null && el !== undefined),
      map((url: string) => {
        try {
          return {
            isFile: /\.md$/.test(url),
            isGH: url?.includes('github.com'),
            isIssues: url?.includes('issues'),
            separatorCounter: url?.split('/').length,
            url: url ? (new URL(url)).pathname : ''
          }
        } catch (error) {
          throw new Error('Analyzing url is failed')
        }
      }),
      switchMap((data: LinkDataModel) => {
        if (data.url && !(data?.isGH && (data?.isFile || data?.isIssues || data?.separatorCounter === 5))) {
          if (isDevMode()) {
            throw new Error('Conditions is not equal a link')
          }
        }

        if (data.isGH && data.isIssues && data?.url) {
          return this.http.get<ReposResponseInterface>(`https://api.github.com/repos${data?.url}`)
        } else if (data.isFile && data?.url) {
          return this.http.request('get', `https://raw.githubusercontent.com/${data?.url.replace('blob/', '')}`, {
            responseType: 'text'
          }).pipe(catchError((e: Error) => of('')))
        } else if (data?.url) {
          return this.http.get<MainResponseInterface>(`https://api.github.com/repos${data?.url}/contents/README.md`)
            .pipe(catchError((e: Error) => of('')))
        } else {
          return of('')
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
      catchError((error: Error) => {
        console.log('File by link ' + link + ' is not be a parsed', error)
        return EMPTY
      })
    )
  }

  getPrepareContent (link: string) {
    return this.getContent(link)
      .pipe(
        map((el: string | undefined) => el || ''),
        map((content: string) => content?.replace(/^# .+\n/g, ''))
      )
  }
}
