export enum RequestStatus {
  loading = 'loading',
  complete = 'complete',
  error = 'error'
}
export type RequestError = {
  status: number
  message: string
} | null

export interface RequestConfigNode {
  nodes: string
  signer: string
  rest: string
  explorer: string
}

export interface RequestModel<T> {
  status: RequestStatus
  error: RequestError
  payload: T
}
