/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */
import {MonoTypeOperatorFunction, Observable} from 'rxjs'
import {isDevMode} from '@angular/core'

class Log {
  public log<T> (...messages: string[]): MonoTypeOperatorFunction<T> {

    return (source: Observable<T>): Observable<T> => {
      if (!isDevMode()) {
        return source
      }

      return new Observable(observer => source.subscribe({
          next: (x: any) => {
            if (isDevMode()) {
              console.groupCollapsed(...messages)
              console.log(x)
              console.groupEnd()
            }

            observer.next(x)
          },
          error: (err: any) => { observer.error(err) },
          complete: () => { observer.complete() }
        }))
    }
  }
}

export const logger = new Log()
export const log = logger.log.bind(logger)
