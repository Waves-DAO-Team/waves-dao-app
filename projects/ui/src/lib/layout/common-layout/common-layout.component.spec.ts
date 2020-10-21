import { createComponentFactory, Spectator } from '@ngneat/spectator'
import { CommonLayoutComponent } from './common-layout.component'
import { Component } from '@angular/core'

@Component({
  template: `
    header
  `
})
class HeaderComponent {}

@Component({
  template: `
    footer
  `
})
class FooterComponent {}

describe('CommonLayoutComponent', () => {
  let spectator: Spectator<CommonLayoutComponent>
  const createComponent = createComponentFactory(CommonLayoutComponent)

  beforeEach(() => {
    spectator = createComponent()
  })

  it('should create', () => {
    expect(spectator.component).toBeTruthy()
  })

  it('should render footer and header getted via DI', () => {
    expect(spectator.query(HeaderComponent)).toBeTruthy()
    expect(spectator.query(FooterComponent)).toBeTruthy()
  })
})
