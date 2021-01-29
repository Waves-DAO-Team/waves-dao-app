import { Injectable } from '@angular/core'
import { CommonContractService } from './common-contract.service'
import { EMPTY, Observable } from 'rxjs'
import { TransactionsSuccessResult } from '@services/signer/signer.model'
import { catchError, tap } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class InterhackContractService {
  constructor (
    private readonly commonContractService: CommonContractService, // eslint-disable-line
    private readonly contractService: ContractService, // eslint-disable-line
    private readonly signerService: SignerService, // eslint-disable-line
    private readonly snackBar: MatSnackBar  // eslint-disable-line
  ) {}

  // Add DAO Members
  public addDAOMember (member: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addDAOMember(member)
  }

  // ADD work group user
  public addGroupMember (member: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addGroupMember(member)
  }

  // Finished create task. Start voting
  // Permission: only WG
  public addReward (taskId: string, reward: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addReward(taskId, reward)
  }

  public finishApplicantsVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishApplicantsVoting', [
      { type: 'string', value: taskId }
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.finishApplicantsVoting'), translate('messages.ok'))
      })
    )
  }

  public acceptWorkResult (taskId: string, winnerIdentifier: string, reportLink: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'acceptWorkResult',
      [{ type: 'string', value: taskId }, { type: 'string', value: winnerIdentifier }, { type: 'string', value: reportLink }])
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(translate(mes))
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.rejectTask'), translate('messages.ok'))
        })
      )
  }
}
