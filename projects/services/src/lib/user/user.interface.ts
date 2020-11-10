export enum RoleEnum {
  unauthorized,
  authorized,
  DAOMember,
  workingGroup,
  master
}

export interface UserInterface {
  userData: {
    userRole: RoleEnum,
    userAddress: string
  }

  otherData: {
    DAOMemberAddress: string[]
  }

  getRole(): RoleEnum

  _subscribe(): void

  _defineRol(): void
}
