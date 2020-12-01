import { InjectionToken, Provider, Type } from '@angular/core'
import { environment } from '../environments/environment'

export interface AppConstantsInterface {
  routes: {[s: string]: string | string[]}
}

export interface AppApiInterface {
  nodes: string
  signer: string
  rest: string
  contractAddress: string
  contracts: {
    disruptive: string,
    dev: string,
    interhack: string
  }
}

export const APP_CONSTANTS = new InjectionToken<Type<AppConstantsInterface>>('Application constants')

export const API = new InjectionToken<Type<AppApiInterface>>('Application api constants')

export function provideApi (): Provider[] {
  return [
    {
      provide: API,
      useValue: {
        ...environment.apis
      }
    }
  ]
}

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
