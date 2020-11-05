import { Observable, Subject, EMPTY } from 'rxjs'
import { shareReplay, catchError } from 'rxjs/operators'

export interface LoadingWrapperModel<T> {
  data$: Observable<T>
  error$: Observable<boolean>
}

export class LoadingWrapper<T> {
  private readonly errorLoading$ = new Subject<boolean>()
  readonly error$: Observable<boolean> = this.errorLoading$.pipe(shareReplay(1))
  readonly data$: Observable<T>

  constructor (data: Observable<T>) {
    this.data$ = data.pipe(
      shareReplay(1),
      catchError((error) => {
        // Todo решить где и как обрабатывать ошибку
        console.log('LoadingWrapper::Error\n', error)
        this.errorLoading$.next(true)
        return EMPTY
      })
    )
  }
}
