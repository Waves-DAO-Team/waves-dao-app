import { Injectable } from '@angular/core'
import {MainResponseInterface, ReposResponseInterface} from '@services/link-content/link-content.interface'
import { BehaviorSubject} from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { filter, map, switchMap, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LinkContentService {
  link$ = new BehaviorSubject<string | null>(null)
  mdText$ = new BehaviorSubject<string | null>(null)
  md$ = this.link$.pipe(
    // @ts-ignore
    tap((url: string | null) => {this.mdText$.next(null)}),
    // @ts-ignore
    filter((url: string | null) => url != null),
    map((url: string) => {
      return {
        isGH: url.includes('github.com'),
        isIssues: url.includes('issues'),
        separatorCounter: url.split('/').length,
        url: url
      }
    }),
    filter((data) => (data.isGH && (data.isIssues || data.separatorCounter === 5))),
    // @ts-ignore
    switchMap((data) => {
      if (data.isGH && data.isIssues) {
        return this.http.get<ReposResponseInterface>(`https://api.github.com/repos${(new URL(data.url)).pathname}`)
      } else {
        return this.http.get<MainResponseInterface>(`https://api.github.com/repos${(new URL(data.url)).pathname}/contents/README.md`)
      }
    }),
    tap(
      (data: ReposResponseInterface | MainResponseInterface) => {
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
