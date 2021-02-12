import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco'
import * as en from '../../../../resources/i18n/en.json'

export const getTranslocoModule = (options: TranslocoTestingOptions = {}): TranslocoTestingModule => TranslocoTestingModule.forRoot({
  langs: { en },
  translocoConfig: {
    availableLangs: ['en'],
    defaultLang: 'en',
    missingHandler: {
      logMissingKey: false
    }
  },
  ...options
})
