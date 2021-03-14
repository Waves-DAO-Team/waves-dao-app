// eslint-disable
export enum RoleEnum {
  unauthorized = 'unauthorized',
  authorized = 'authorized',
  daoMember = 'DAOMember',
  workingGroup = 'workingGroup',
  master = 'master',
  manager = 'manager'
}

export interface RolesInterface {
  isMaster: boolean
  isDAO: boolean
  isWG: boolean
  isAuth: boolean
  isUnauthorized: boolean
  isManager: boolean
}

export interface RoleRowInterface {
  mainRole: RoleEnum
  roles: RolesInterface
}

export interface UserDataInterface {
  userRole: RoleEnum
  userAddress: string
  addressDAOMember: string[]
  addressWorkGroup: string[]
  masterAddress: string
  roles: RolesInterface
  balance: string
  manager: string
}
