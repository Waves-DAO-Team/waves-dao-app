import { environment } from '../../../../dapp/src/environments/environment'

export enum RoleEnum {
  unauthorized,
  authorized,
  DAOMember,
  workingGroup,
  master
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
