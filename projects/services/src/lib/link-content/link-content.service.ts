import { Injectable } from '@angular/core'
import { MainResponseInterface, ReposResponseInterface } from '@services/link-content/link-content.interface'
import { BehaviorSubject, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { catchError, filter, map, repeatWhen, switchMap, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LinkContentService {
  link$ = new BehaviorSubject<string | null>(null)
  mdText$ = new BehaviorSubject<string | null>(null)

  public readonly mdTextStream$ = this.mdText$.pipe(
    map((content) => {
      return content?.replace(/^# .+\n/g, '')
    })
  )

  md$ = this.link$.pipe(
    // @ts-ignore
    tap((url: string | null) => { this.mdText$.next(null) }),
    repeatWhen(() => this.link$),
    // @ts-ignore
    filter((url: string | null) => url != null),
    map((url: string) => {
      console.log(url)
      return {
        isFile: /\.md$/.test(url),
        isGH: url.includes('github.com'),
        isIssues: url.includes('issues'),
        separatorCounter: url.split('/').length,
        url
      }
    }),
    filter((data) => (data.isGH && (data.isFile || data.isIssues || data.separatorCounter === 5))),
    // @ts-ignore
    switchMap((data) => {
      if (data.isGH && data.isIssues) {
        return this.http.get<ReposResponseInterface>(`https://api.github.com/repos${(new URL(data.url)).pathname}`)
      } else if (data.isFile) {
        const path = (new URL(data.url)).pathname
        return this.http.get(`https://raw.githubusercontent.com/${path.replace('/blob', '')}`)
          .pipe(catchError((e) => of('')))
      } else {
        return this.http.get<MainResponseInterface>(`https://api.github.com/repos${(new URL(data.url)).pathname}/contents/README.md`)
          .pipe(catchError((e) => of('')))
      }
    }),
    // catchError((e) => {
    //   console.log('----ERRR', e)
    //   return of('---');
    // }),
    tap(
      (data: ReposResponseInterface | MainResponseInterface | string) => {
        if (typeof data === 'string') {
          return this.mdText$.next(data)
        }

        if ('body' in data) {
          this.mdText$.next(data.body)
        } else if ('content' in data) {
          this.mdText$.next(atob(data.content))
        }
      }
    )
  ).subscribe()

  constructor (private readonly http: HttpClient) { }
}
