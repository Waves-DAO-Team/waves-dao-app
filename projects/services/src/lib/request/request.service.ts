import {Inject, Injectable} from '@angular/core'
import {
  ContractRawData,
} from '@services/contract/contract.model'
import {
  NEVER,
  Observable,
  of, Subject,
} from 'rxjs';
import {RequestConfigNode, RequestError, RequestModel, RequestStatus} from '@services/request/request.model'
import {API, AppApiInterface} from '@constants'
import {HttpClient} from '@angular/common/http'
import { log } from '@libs/log/log.rxjs-operator'
import {
  catchError,
  map,
  publishReplay,
  refCount, repeatWhen,
  startWith,
  switchMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private cache: {[s: string]: Observable<RequestModel<ContractRawData>>} = {}

  private readonly refresh$ = new Subject()

  constructor (
      private readonly http: HttpClient,
      @Inject(API) private readonly api: AppApiInterface
  ) { }

  getContract (address: string): Observable<RequestModel<ContractRawData>> {
    if (this.cache[address]) {
      return this.cache[address]
    }

    const config = this.getConfigNode(address)

    const url = new URL('/addresses/data/' + address, config.rest)

    this.cache[address] = this.http.get<ContractRawData>(url.href, {
      headers: { accept: 'application/json; charset=utf-8' }
    }).pipe(
        log(`%c RequestService::getContract::${address}`, 'color: blue'),
        // Repeat request on contract if refresh this
        repeatWhen((data) => {
          return this.refresh$.pipe(switchMap((addr) => {
            // Check refresh address
            if (address === addr) {
              // Return refresh subject
              return of(null);
            }
            // Block refresh action
            return NEVER;
          }))
        }),
        map((data: ContractRawData) => ({
            status: RequestStatus.complete,
            error: null,
            payload: data
          })),
        startWith({
          status: RequestStatus.loading,
          error: null,
          payload: []
        }),
        catchError((error) => of({
            status: RequestStatus.error,
            error: error as RequestError,
            payload: []
          })),
        publishReplay(1),
        refCount()
    )

    return this.cache[address]
  }

  private getConfigNode (address: string): RequestConfigNode {
    if (address.indexOf('3P') === 0) {
      return this.api.mainnet
    }

    if (address.indexOf('3M') * address.indexOf('3N') === 0) {
      return this.api.testnet
    }

    throw new Error(`Contract address ${address} is not valid`)
  }

  public refresh(address: string) {
    this.refresh$.next(address);
  }

}
