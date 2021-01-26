import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco'
// @ts-expect-error
import en from '../../../../resources/i18n/en.json'

export const getTranslocoModule = (options: TranslocoTestingOptions = {}) => TranslocoTestingModule.forRoot({
  langs: { en },
  translocoConfig: {
    availableLangs: ['en'],
    defaultLang: 'en'
  },
  ...options
})
