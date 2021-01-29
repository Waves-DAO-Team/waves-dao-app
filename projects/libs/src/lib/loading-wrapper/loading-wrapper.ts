import { Observable, Subject, EMPTY } from 'rxjs'
import {
  catchError,
  takeUntil,
  publishReplay,
  refCount
} from 'rxjs/operators'
import {translate} from "@ngneat/transloco";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface LoadingWrapperModel<T> {
  data$: Observable<T>
  error$: Observable<boolean>
  destroy: () => void
}

export class LoadingWrapper<T> {
  readonly data$: Observable<T>
  private readonly errorLoading$ = new Subject<boolean>()
  private readonly destroyed$ = new Subject()
  readonly error$: Observable<boolean> = this.errorLoading$.pipe(
    takeUntil(this.destroyed$),
    publishReplay(1),
    refCount()
  )

  constructor (
    data: Observable<T>,
    private readonly snackBar: MatSnackBar,
  ) {
    this.data$ = data.pipe(
      takeUntil(this.destroyed$),
      publishReplay(1),
      refCount(),
      catchError((error) => {
        this.snackBar.open(error, error)
        setTimeout(() => {
          this.errorLoading$.next(true)
        })
        return EMPTY
      })
    )
  }

  destroy () {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
}
