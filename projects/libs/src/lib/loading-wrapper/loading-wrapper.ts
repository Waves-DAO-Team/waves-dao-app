import {Observable, Subject, BehaviorSubject} from 'rxjs'
import {
  takeUntil,
  publishReplay,
  refCount, map,
} from 'rxjs/operators'
import { log } from '@libs/log/log.rxjs-operator'
import {RequestModel} from '@services/request/request.model'

export interface LoadingWrapperModel<T> {
  data$: Observable<T | null>
  error$: Observable<boolean>
  destroy: () => void
}

export class LoadingWrapper<T> {
  readonly data$: Observable<T | null>
  private readonly errorLoading$ = new BehaviorSubject<boolean>(false)
  private readonly destroyed$ = new Subject()
  public error$: Observable<boolean> = this.errorLoading$.pipe(
      takeUntil(this.destroyed$),
      publishReplay(1),
      refCount()
  )

  constructor (data: Observable<RequestModel<T>>, name: string = '') {
    this.data$ = data.pipe(
      log(`%c LoadingWrapper::data$::${ name }`, 'color:orange'),
      takeUntil(this.destroyed$),
      map((context: RequestModel<T>): T | null => {
        if (!context) {
          return null
        }

        if (context?.status === 'loading') {
          return null
        }

        if (context?.status === 'error') {
          this.errorLoading$.next(true)
          return null
        } else {
          this.errorLoading$.next(false)
        }

        return context?.payload
      }),
      publishReplay(1),
      refCount()
    )
  }

  destroy (): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
}
