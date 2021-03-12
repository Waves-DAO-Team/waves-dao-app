/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */
import 'reflect-metadata'
import { Subject } from 'rxjs'
import { destroyQueue } from '@libs/decorators/common.decorator'

/* USE
 *
 * @DestroyedSubject() private readonly destroyed$!: Subject<null>
 * ...
 * const stream$ = subject$.pipe(
 *   takeUntil(this.destroyed$)
 * )
 * ...
 * ngOnDestroy(){}
 * */

// https://habr.com/ru/post/494668/
export function DestroyedSubject (): (target: any, propertyKey: string) => void {
  return (target: any, propName: string) => {
    Reflect.defineProperty(target, propName, {
      value: new Subject(),
    })

    destroyQueue(
      target,
      function () {
        // @ts-ignore Decorators are poorly typed
        this[propName].next(null)
        // @ts-ignore Decorators are poorly typed
        this[propName].complete()
      }.bind(target),
    )
  }
}
