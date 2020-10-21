import { InjectionToken, Provider, Type } from '@angular/core'
import { environment } from '../environments/environment'

export interface AppConstantsInterface {
  routes: {[s: string]: string | string[]}
}

export const APP_CONSTANTS = new InjectionToken<Type<AppConstantsInterface>>('Application constants')

export function provideAppConstants (): Provider[] {
  return [
    {
      provide: APP_CONSTANTS,
      useValue: {
        routes: environment.routing
      }
    }
  ]
}
