import { Component } from '@angular/core'

export const destroyQueue = (target: object, func: () => void) => {
  const METADATA_PROPERTY_KEY = 'ngOnDestroy'
  const METADATA_KEY = 'queue'

  const originalDestroy = target.constructor.prototype.ngOnDestroy
  if (typeof originalDestroy !== 'function') {
    console.error(`${target.constructor.name} is using @DestroyedSubject but does not implement OnDestroy`)
  }

  // Создаем метадату для того что бы в ней хранить очередь событий для дестроя
  const metadata = Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY)

  Reflect.defineMetadata(METADATA_KEY, (metadata || []).concat([func]), target, METADATA_PROPERTY_KEY)

  Reflect.set(
    // @ts-ignore
    target.constructor.ɵcmp,
    'onDestroy',
    function (...args: (() => void)[]) {
      if (typeof originalDestroy === 'function') {
        // @ts-ignore
        originalDestroy.apply(this, args)
      }

      Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY).reduce((orig: null, fn: () => void) => {
        return fn()
      }, null)
    }.bind(target)
  )
}
