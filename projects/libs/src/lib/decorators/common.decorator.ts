/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'reflect-metadata'

export const destroyQueue = (target: any, func: () => void) => {
  const METADATA_PROPERTY_KEY = 'ngOnDestroy'
  const METADATA_KEY = 'queue'

  const originalDestroy = target.ngOnDestroy
  if (typeof originalDestroy !== 'function') {
    console.error(`${target.constructor.name} is using @DestroyedSubject but does not implement OnDestroy`)
  }

  const metadata = Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY)

  Reflect.defineMetadata(METADATA_KEY, (metadata || []).concat([func]), target, METADATA_PROPERTY_KEY)

  Reflect.set(target, 'ngOnDestroy', function (...args: any[]) {
    if (typeof originalDestroy === 'function') {
      // @ts-ignore: Decorators are poorly typed
      originalDestroy.apply(this, args)
    }

    Reflect.getMetadata(METADATA_KEY, target, METADATA_PROPERTY_KEY).reduce((orig: any, fn: any) => fn(), null)
  })
}
