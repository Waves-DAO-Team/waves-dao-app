import { IUserData } from '@waves/signer/cjs/interface'

export interface TransactionState {
  status: 'unconfirmed' | 'confirmed'
  confirmations: number
}

export type TransactionRawState = TransactionState[]

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

export type SignerInvokeArgs = SignerInvokeArgString | SignerInvokeArgInteger | SignerInvokeArgBinary
