
export enum RoleEnum {
  unauthorized = 'unauthorized',
  authorized = 'authorized',
  DAOMember = 'DAOMember',
  workingGroup = 'workingGroup',
  master = 'master'
}

export interface UserDataInterface {
  userRole: RoleEnum,
  userAddress: string,
  DAOMemberAddress: string[],
  WorkGroupAddress: string[],
  masterAddress: string
}
