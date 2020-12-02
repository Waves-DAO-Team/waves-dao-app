import { Observable, Subject, EMPTY } from 'rxjs'
import { shareReplay, catchError, takeUntil } from 'rxjs/operators'

export interface LoadingWrapperModel<T> {
  data$: Observable<T>
  error$: Observable<boolean>
  destroy: () => void
}

export class LoadingWrapper<T> {
  private readonly errorLoading$ = new Subject<boolean>()
  readonly error$: Observable<boolean> = this.errorLoading$.pipe(shareReplay(1))
  readonly data$: Observable<T>

  private destroyed$ = new Subject();

  constructor (data: Observable<T>) {
    this.data$ = data.pipe(
      takeUntil(this.destroyed$),
      shareReplay(1),
      catchError((error) => {
        // Todo решить где и как обрабатывать ошибку
        console.log('LoadingWrapper::Error\n', error)
        this.errorLoading$.next(true)
        return EMPTY
      })
    )
  }

  destroy () {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
}
