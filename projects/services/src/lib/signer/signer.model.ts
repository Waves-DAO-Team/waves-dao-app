import {IUserData} from '@waves/signer/'

export interface TransactionState {
  id: string
  status: 'unconfirmed' | 'confirmed'
  confirmations: number
}

export type TransactionRawState = TransactionState[]

export interface TransactionsSuccessResult extends TransactionState {
  applicationStatus: 'succeeded'
  height: number
}

export interface SignerUser extends IUserData {
  name: string
  balance: string
}

export interface SignerInvokeArgString {
  type: 'string'
  value: string
}

export interface SignerInvokeArgInteger {
  type: 'integer'
  value: number
}

export interface SignerInvokeArgBinary {
  type: 'binary'
  value: number
}

export interface SignerInvokeArgs {
  type: number | string,
  value: number | string,
}
export interface ISignerInvokeAnyData {
  [s: string]: any // eslint-disable-line
}
