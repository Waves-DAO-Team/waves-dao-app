/* eslint-disable @typescript-eslint/no-explicit-any, prefer-arrow/prefer-arrow-functions, @typescript-eslint/naming-convention */
import 'reflect-metadata'
import { Subject } from 'rxjs'
import { destroyQueue } from '@libs/decorators/common.decorator'

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
