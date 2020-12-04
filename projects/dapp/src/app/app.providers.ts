import { InjectionToken, Provider, Type } from '@angular/core'
import { environment } from '../environments/environment'

export interface AppConstantsInterface {
  production: boolean
  routes: {[s: string]: string | string[]}
}

export interface AppApiInterface {
  nodes: string
  signer: string
  rest: string
  contractAddress: string
  confirmations: number
  contracts: {
    disruptive: string,
    dev: string,
    interhack: string
  },
  grantsProgramLink: string
}

export const APP_CONSTANTS = new InjectionToken<Type<AppConstantsInterface>>('Application constants')

export const API = new InjectionToken<Type<AppApiInterface>>('Application api constants')

export function provideApi (): Provider[] {
  return [
    {
      provide: API,
      useValue: {
        ...environment.apis,
        confirmations: environment.confirmations,
        grantsProgramLink: environment.grantsProgramLink
      }
    }
  ]
}

export function provideAppConstants (): Provider[] {
  return [
    {
      provide: APP_CONSTANTS,
      useValue: {
        routes: environment.routing,
        production: environment.production
      }
    }
  ]
}
