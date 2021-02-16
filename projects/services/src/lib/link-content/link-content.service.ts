import {Inject, Injectable, isDevMode} from '@angular/core'
import { MainResponseInterface, ReposResponseInterface } from '@services/link-content/link-content.interface'
import { EMPTY, Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { catchError, filter, map, switchMap, take } from 'rxjs/operators'
import {API, AppApiInterface} from "@constants";
import {translate} from "@ngneat/transloco";

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
  constructor (
    private readonly http: HttpClient,
    @Inject(API) private readonly api: AppApiInterface
  ) { // eslint-disable-line
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
          throw new Error(translate('messages.errors.analyzing_failed'))
        }
      }),
      switchMap((data: LinkDataModel) => {
        console.log(translate('messages.transaction_rejected'))
        if (data.url && !(data?.isGH && (data?.isFile || data?.isIssues || data?.separatorCounter === 5))) {
          if (isDevMode()) {
            throw new Error(translate('messages.errors.conditions_link'))
          }
        }

        if (data.isGH && data.isIssues && data?.url) {
          return this.http.get<ReposResponseInterface>(`${this.api.links.github?.api}${data?.url}`)
        } else if (data.isFile && data?.url) {
          return this.http.request('get', `${this.api.links.github?.raw}${data?.url.replace('blob/', '')}`, {
            responseType: 'text'
          }).pipe(catchError(() => of('')))
        } else if (data?.url) {
          return this.http.get<MainResponseInterface>(`${this.api.links.github?.api}${data?.url}${this.api.links.github?.mdEnd}`)
            .pipe(catchError(() => of('')))
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
      catchError(() => EMPTY)
    )
  }

  getPrepareContent (link: string): Observable<string | undefined> {
    return this.getContent(link)
      .pipe(
        map((el: string | undefined) => el || ''),
        map((content: string) => content?.replace(/^# .+\n/g, ''))
      )
  }
}
