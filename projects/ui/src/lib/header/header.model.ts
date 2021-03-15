import {UserDataInterface} from '@services/user/user.interface'

export interface HeaderComponentUserModel extends UserDataInterface {
  name: string;
  publicKey: string;
  address: string;
}
