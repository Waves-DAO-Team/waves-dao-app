/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */

import 'reflect-metadata'
import { ReplaySubject } from 'rxjs'
import { publishReplay, refCount } from 'rxjs/operators'
import { destroyQueue } from './common.decorator'

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
    // eslint-disable-line
    const name = '_async_prop_' + propName
    const stream = '_async_stream_' + propName

    // Create subject
    Reflect.defineProperty(target, name, {
      value: new ReplaySubject(1),
      writable: true,
    })

    // Create stream subject with destroy
    Reflect.defineProperty(target, stream, {
      value: target[name].pipe(publishReplay(1), refCount()),
      writable: true,
    })

    Reflect.defineProperty(target, propName, {
      set: (item): void => {
        target[name].next(item)
      },
      get: (): any => target[stream],
    })

    destroyQueue(
      target,
      function () {
        // @ts-ignore: Decorators are poorly typed
        this[name].complete()
      }.bind(target),
    )
  }
}
