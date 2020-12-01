import { TranslocoTestingModule, TranslocoConfig } from '@ngneat/transloco'
// @ts-ignore
import en from '../../../../resources/i18n/en.json'

export function getTranslocoModule (config: Partial<TranslocoConfig> = {}) {
  return TranslocoTestingModule.withLangs(
    { en },
    {
      availableLangs: ['en'],
      defaultLang: 'en',
      ...config
    }
  )
}
