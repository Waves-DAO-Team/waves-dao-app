import 'reflect-metadata'
import { Subject } from 'rxjs'
import { destroyQueue } from '@libs/decorators/common.decorator'

// https://habr.com/ru/post/494668/
export function DestroyedSubject<PropertyDecorator> (): (target: object, propertyKey: string) => void {
  return (target: object, propName: string) => {
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
