import { Component, InjectionToken, Provider, Type } from '@angular/core'
import { CommonLayoutComponentModel, CommonLayoutInterface } from './common-layout.interface'

export const COMMON_LAYOUT_HEADER = new InjectionToken<Type<Component>>('Common Layout Header Component')
export const COMMON_LAYOUT_FOOTER = new InjectionToken<Type<Component>>('Common Layout Footer Component')
export const COMMON_LAYOUT = new InjectionToken<CommonLayoutInterface>('Common Layout Provider')

export const provideCommonLayout = (component: Type<CommonLayoutInterface>): Provider[] => [
  {
    provide: COMMON_LAYOUT,
    useExisting: component
  }
]

export const provideCommonLayoutHeader = (component: Type<CommonLayoutComponentModel>): Provider[] => [
  {
    provide: COMMON_LAYOUT_HEADER,
    useValue: component
  }
]

export const provideCommonLayoutFooter = (component: Type<CommonLayoutComponentModel>): Provider[] => [
  {
    provide: COMMON_LAYOUT_FOOTER,
    useValue: component
  }
]
