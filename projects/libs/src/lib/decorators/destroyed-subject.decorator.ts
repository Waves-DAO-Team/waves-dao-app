import 'reflect-metadata'
import { Subject } from 'rxjs'
import { destroyQueue } from '@libs/decorators/common.decorator'

// https://habr.com/ru/post/494668/
export function DestroyedSubject<PropertyDecorator> (): (target: any, propertyKey: string) => void { // eslint-disable-line
  return (target: any, propName: string) => { // eslint-disable-line
    Reflect.defineProperty(target, propName, {
      value: new Subject()
    })

    destroyQueue(
      target,
      function () { // eslint-disable-line
        target?.[propName].next()
        target?.[propName].complete()
      }
    )
  }
}
