import 'reflect-metadata'
import { ReplaySubject } from 'rxjs'
import { publishReplay, refCount } from 'rxjs/operators'
import { destroyQueue } from './common.decorator'

// https://habr.com/ru/post/494668/
// http://typescript-lang.ru/docs/Decorators.html
// eslint-disable-next-line
// @ts-ignore
export function Async<PropertyDecorator> (): (target: <T>, propertyKey: string) => void {
  // @ts-ignore
  return (target: <T>, propName: string) => {
    const name = '_async_prop_' + propName
    const stream = '_async_stream_' + propName

    // Create subject
    Reflect.defineProperty(target, name, {
      value: new ReplaySubject(1),
      writable: true
    })

    // Create stream subject with destroy
    Reflect.defineProperty(target, stream, {
      // @ts-ignore
      value: target[name].pipe(publishReplay(1), refCount()),
      writable: true
    })

    Reflect.defineProperty(target, propName, {
      set (item): void {
        // @ts-ignore
        target[name].next(item)
      },
      get () {
        // @ts-ignore
        return target[stream]
      }
    })

    destroyQueue(
      target,
      () => {
        // @ts-ignore
        this[name].complete();
      }
    )
  }
}
