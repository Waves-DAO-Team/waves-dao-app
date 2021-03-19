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
    private readonly contractService: ContractService,  // eslint-disable-line
    private readonly signerService: SignerService,  // eslint-disable-line
    private readonly snackBar: MatSnackBar,  // eslint-disable-line
    public router: Router,  // eslint-disable-line
    public membershipService: MembershipService  // eslint-disable-line
  ) {
  }

  public addDAOMember (members: string): Observable<TransactionsSuccessResult> {
    return this.membershipService.addDAOMember(members)
  }

  public addGroupMember (members: string): Observable<TransactionsSuccessResult> {
    return this.membershipService.addGroupMember(members)
  }

  public addTask (taskName: string, link: string, hash: string = ''): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'addTask',
      [
        { type: 'string', value: taskName },
        { type: 'string', value: link },
        { type: 'string', value: hash }
      ]
    )
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(translate(mes))

          return EMPTY
        }),
        tap(() => {
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
          this.snackBar.open(translate(mes))
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.addReword'), translate('messages.ok'))
        })
      )
  }
}
