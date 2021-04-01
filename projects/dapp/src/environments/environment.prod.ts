import * as local  from './environment'

export const environment = {
  ...local.environment,
  production: true,
  confirmations: 0
}
