/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import {isDevMode} from '@angular/core'

export const debug$ = ( target: any, propertyKey: string ) => {
  const propertyDebugKey = '_' + propertyKey + '_debug'
  let propertyValue: any

  function getter () {
    return propertyValue
  }

  function setter ( value: any ) {
    if( value  instanceof Observable ) {
      propertyValue = value.pipe(tap((data) => {
        const isArrayOfObjects = Array.isArray(data) && typeof data[0] === 'object'
        const logType = isArrayOfObjects ? 'table' : 'log'
        window.console.groupCollapsed(`${target.constructor.name}::${propertyKey}`)
        window.console[logType](data)
        window.console.groupEnd()
      }))
    } else {
      window.console.warn('Property ' + propertyKey + ' is not observable. Debug mode is not activated')
      propertyValue = value
    }
  }

  if (isDevMode()) {
    Object.defineProperty(target, propertyDebugKey, {
      enumerable: true,
      configurable: true,
      value: []
    })

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }

  return
}
