import { environment } from '../../../../dapp/src/environments/environment'

export enum RoleEnum {
  unauthorized = 'unauthorized',
  authorized = 'authorized',
  DAOMember = 'DAOMember',
  workingGroup = 'workingGroup',
  master = 'master'
}

export interface UserDataInterface {
    userRole: RoleEnum,
    userAddress: string
}

export interface OtherDataInterface {
  DAOMemberAddress: string[],
  WorkGroupAddress: string[],
  masterAddress: string
}
