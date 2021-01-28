import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco'
// @ts-ignore
import en from '../../../../resources/i18n/en.json'

export function getTranslocoModule (options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en },
    translocoConfig: {
      availableLangs: ['en'],
      defaultLang: 'en'
    },
    ...options
  })
}
