import { Injectable } from '@angular/core'
import { catchError, tap } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { EMPTY, Observable } from 'rxjs'
import { CommonContractService } from '@services/contract/common-contract.service'
import { ContractService } from '@services/contract/contract.service'
import { SignerService } from '@services/signer/signer.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TransactionsSuccessResult } from '@services/signer/signer.model'

@Injectable({
  providedIn: 'root'
})
export class CommunityContractService {
  constructor (
    private commonContractService: CommonContractService,
    private contractService: ContractService,
    private readonly signerService: SignerService,
    private snackBar: MatSnackBar
  ) {
  }

  streamContractService () {
    return this.contractService.stream
  }

  public addTask (taskName: string, link: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addTask(taskName, link)
  }

  public initTaskVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'initTaskVoting',
      [
        { type: 'string', value: taskId }
      ],
      [
        // { assetId: 'WAVES', amount: 400000 }
      ]
    )
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.message, translate('messages.ok'))
          return EMPTY
        }),
        tap((e) => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.initTaskVoting'), translate('messages.ok'))
        })
      )
  }

  public addReward (taskId: string, reward: string) {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'addReward',
      [
        { type: 'string', value: taskId },
        { type: 'integer', value: parseFloat(reward) }
      ]
    ).pipe(
        catchError((error) => {
          this.snackBar.open(error.message, translate('messages.ok'))
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.addReword'), translate('messages.ok'))
        })
      )
  }

  public addTaskDetails (taskId: string, reward: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'addTaskDetails',
      [
        { type: 'string', value: taskId },
        { type: 'integer', value: parseFloat(reward) }
      ],
      [
        { assetId: 'WAVES', amount: 500000 }
      ]
    )
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.message, translate('messages.ok'))
          return EMPTY
        }),
        tap((e) => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.addReword'), translate('messages.ok'))
        })
      )
  }
}
