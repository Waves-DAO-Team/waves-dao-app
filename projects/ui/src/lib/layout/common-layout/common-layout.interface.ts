import { Component, TemplateRef } from '@angular/core'

export interface CommonLayoutComponentModel extends Component {
  ngOnInit?: () => void
}

export interface CommonLayoutInterface {
  hasLayoutContent: () => boolean
}

export interface CommonLayoutFooterExtensionInterface {
  uiFooterExtensionTemplate: TemplateRef<Component>
}
