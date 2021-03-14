/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */

import 'reflect-metadata'
import {BehaviorSubject} from 'rxjs'
import { destroyQueue } from './common.decorator'
import {log} from '@libs/log'

/* USE
 *
 * @Async() @Input('contract') public readonly contract$!: Observable<GrantsVariationType>
 *
 * this.contract$.pipe(tap(data) => {
 *   console.log(data);
 *   // Return @Input('contract') like observable variable
 * })
 * */

// https://habr.com/ru/post/494668/
// http://typescript-lang.ru/docs/Decorators.html
export function Async (): (target: any, propertyKey: string) => void {
  // eslint-disable-line
  return (target: any, propName: string) => {
    const name: string = '_async_prop_' + propName

    Reflect.defineProperty(target, name, {
      value: new BehaviorSubject(undefined),
      writable: true,
    })

    Reflect.defineProperty(target, propName, {
      set (item: any): void {
        // @ts-ignore: use this context
        this[name].next(item)
      },
      get (): any {
        // @ts-ignore: use this context
        return this[name].pipe(
            log(`%c Get @Async argument ${propName} from ${target.constructor.name}`, 'color:cyan')
        )
      },
      enumerable: true,
      configurable: true,
    })

    destroyQueue(
      target,
      function () {}.bind(target),
    )
  }
}
