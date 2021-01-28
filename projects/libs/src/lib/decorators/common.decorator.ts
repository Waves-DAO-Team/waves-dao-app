import 'reflect-metadata'
import {Component} from '@angular/core'

export const destroyQueue = (target: Component, func: () => void) => {
  const METADATA_PROPERTY_KEY = 'ngOnDestroy'
  const METADATA_KEY = 'queue'

  const originalDestroy = target.constructor.prototype.ngOnDestroy
  if (typeof originalDestroy !== 'function') {
    console.error(`${target.constructor.name} is using @DestroyedSubject but does not implement OnDestroy`)
  }

  // Создаем метадату для того что бы в ней хранить очередь событий для дестроя
  const metadata = Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY)

  Reflect.defineMetadata(METADATA_KEY, (metadata || []).concat([func]), target, METADATA_PROPERTY_KEY)

  // @ts-ignore
  if (target.constructor && target.constructor.ɵcmp) {
    Reflect.set(
      // @ts-ignore
      target.constructor.ɵcmp,
      'onDestroy',
      function (...args: Array<() => void>) {
        if (typeof originalDestroy === 'function') {
          // @ts-ignore
          originalDestroy.apply(this, args)
        }

        Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY)
          .reduce((orig: null, fn: () => void) => fn(), null)
      }.bind(target)
    )
  }
}
