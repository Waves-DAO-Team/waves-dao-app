/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* USE
 * @debug$
 * const straem$ = combineLatest([..., ...]).pipe(...)
 *  */

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { isDevMode } from '@angular/core'

export const debug$ = (target: any, propertyKey: string) => {
  let propertyValue: any

  function getter () {
    return propertyValue
  }

  function setter (value: any) {
    if (value instanceof Observable && value.source && value.source.source) {
      propertyValue = value.source.source.pipe(
        tap((data) => {
          const isArrayOfObjects = Array.isArray(data) && typeof data[0] === 'object'
          const logType = isArrayOfObjects ? 'table' : 'log'
          window.console.groupCollapsed(`${target.constructor.name}::${propertyKey}`)
          window.console[logType](data)
          window.console.groupEnd()
        }),
      )
    } else {
      window.console.warn('Property ' + propertyKey + ' is not observable. Debug mode is not activated')
      propertyValue = value
    }
  }

  if (isDevMode()) {
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }

  return
}
