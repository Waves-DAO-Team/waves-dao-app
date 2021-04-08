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
export class VotingsContractService {
  constructor (
    private readonly commonContractService: CommonContractService,
    private readonly contractService: ContractService,
    private readonly signerService: SignerService,
    private readonly snackBar: MatSnackBar
  ) {}


  public finishTaskProposalVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishTaskProposalVoting',
      [{ type: 'string', value: taskId }])
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
