import { Injectable } from '@angular/core'
import { ContractService } from '@services/contract/contract.service'
import { SignerService } from '@services/signer/signer.service'
import { catchError, tap } from 'rxjs/operators'
import { EMPTY, Observable } from 'rxjs'
import { translate } from '@ngneat/transloco'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { TransactionsSuccessResult } from '@services/signer/signer.model'
import { MembershipService } from '@services/membership/membership.service'

@Injectable({
  providedIn: 'root'
})
export class CommonContractService {
  constructor (
    private contractService: ContractService,
    private readonly signerService: SignerService,
    private snackBar: MatSnackBar,
    public router: Router,
    public membershipService: MembershipService
  ) {
  }

  public addDAOMember (members: string): Observable<TransactionsSuccessResult> {
    return this.membershipService.addDAOMember(members)
  }

  public addGroupMember (members: string): Observable<TransactionsSuccessResult> {
    return this.membershipService.addGroupMember(members)
  }

  public addTask (taskName: string, link: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'addTask',
      [
        { type: 'string', value: taskName },
        { type: 'string', value: link }
      ]
    )
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(mes)
          return EMPTY
        }),
        tap((e) => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.addTask'), translate('messages.ok'))
        })
      )
  }

  public addReward (taskId: string, reward: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'addReward',
      [
        { type: 'string', value: taskId }
      ],
      [{ assetId: 'WAVES', amount: reward }]
    )
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(mes)
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.addReword'), translate('messages.ok'))
        })
      )
  }
}
