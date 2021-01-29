import { Inject, Injectable } from '@angular/core'
import { ContractRawData } from '@services/contract/contract.model'
import { HttpClient } from '@angular/common/http'
import { API, AppApiInterface } from '@constants'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor (
    private readonly http: HttpClient,
    @Inject(API) private readonly api: AppApiInterface
  ) { }

  public getContractData (address: string): Observable<ContractRawData> {
    const url = new URL('/addresses/data/' + address, this.api.rest)
    return this.http.get<ContractRawData>(url.href, {
      headers: { accept: 'application/json; charset=utf-8' }
    })
  }
}
