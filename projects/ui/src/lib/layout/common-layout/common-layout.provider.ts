import { Component, InjectionToken, Provider, Type } from '@angular/core'
import { CommonLayoutComponentModel, CommonLayoutInterface } from './common-layout.interface'

export const COMMON_LAYOUT_HEADER = new InjectionToken<Type<Component>>('Common Layout Header Component')
export const COMMON_LAYOUT_FOOTER = new InjectionToken<Type<Component>>('Common Layout Footer Component')
export const COMMON_LAYOUT = new InjectionToken<CommonLayoutInterface>('Common Layout Provider')

export function provideCommonLayout (component: Type<CommonLayoutInterface>): Provider[] {
  return [
    {
      provide: COMMON_LAYOUT,
      useExisting: component
    }
  ]
}

export function provideCommonLayoutHeader (component: Type<CommonLayoutComponentModel>): Provider[] {
  return [
    {
      provide: COMMON_LAYOUT_HEADER,
      useValue: component
    }
  ]
}

export function provideCommonLayoutFooter (component: Type<CommonLayoutComponentModel>): Provider[] {
  return [
    {
      provide: COMMON_LAYOUT_FOOTER,
      useValue: component
    }
  ]
}
