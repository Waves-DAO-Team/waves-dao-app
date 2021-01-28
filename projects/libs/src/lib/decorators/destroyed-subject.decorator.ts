import 'reflect-metadata'
import { Subject } from 'rxjs'
import { destroyQueue } from '@libs/decorators/common.decorator'

// https://habr.com/ru/post/494668/
// eslint-disable-next-line
export function DestroyedSubject<PropertyDecorator> (): (target: {}, propertyKey: string) => void {
  return (target: {}, propName: string) => {
    Reflect.defineProperty(target, propName, {
      value: new Subject()
    })

    destroyQueue(
      target,
      function () {
// @ts-ignore
        this[propName].next()
// @ts-ignore
        this[propName].complete()
      }.bind(target)
    )
  }
}
