
export enum RoleEnum {
  unauthorized = 'unauthorized',
  authorized = 'authorized',
  DAOMember = 'DAOMember',
  workingGroup = 'workingGroup',
  master = 'master',
  owner = 'owner'
}

export interface RolesInterface {
  isMaster: boolean
  isDAO: boolean
  isWG: boolean
  isAuth: boolean
  isUnauthorized: boolean
  isOwner: boolean
}

export interface RoleRowInterface {
  mainRole: RoleEnum
  roles: RolesInterface
}

export interface UserDataInterface {
  userRole: RoleEnum,
  userAddress: string,
  DAOMemberAddress: string[],
  WorkGroupAddress: string[],
  masterAddress: string,
  roles: RolesInterface
  voted: string[]
  apply: string[]
  balance: string
  owner: string
}
