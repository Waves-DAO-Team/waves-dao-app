import 'reflect-metadata'

export const destroyQueue = (target: any, func: () => void) => { // eslint-disable-line
  const METADATA_PROPERTY_KEY = 'ngOnDestroy'
  const METADATA_KEY = 'queue'

  const originalDestroy = target.constructor.prototype.ngOnDestroy
  if (typeof originalDestroy !== 'function') {
    console.error(`${target.constructor.name} is using @DestroyedSubject but does not implement OnDestroy`)// eslint-disable-line
  }

  // Создаем метадату для того что бы в ней хранить очередь событий для дестроя
  const metadata = Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY)

  Reflect.defineMetadata(METADATA_KEY, (metadata || []).concat([func]), target, METADATA_PROPERTY_KEY)

  if (target.constructor && target.constructor.ɵcmp) {
    Reflect.set(
      target.constructor.ɵcmp,
      'onDestroy',
      function (...args: Array<() => void>) {
        if (typeof originalDestroy === 'function') {
          // @ts-expect-error // eslint-disable-line
          originalDestroy.apply(this, args)
        }

        Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY)
          .reduce((orig: null, fn: () => void) => fn(), null)
      }.bind(target)
    )
  }
}
