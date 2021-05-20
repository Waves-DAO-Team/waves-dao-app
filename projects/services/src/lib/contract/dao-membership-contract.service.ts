import { Injectable } from '@angular/core'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { CommonContractService } from '@services/contract/common-contract.service'
import { catchError, tap } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { EMPTY, Observable } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TransactionsSuccessResult } from '@services/signer/signer.model'

@Injectable({
  providedIn: 'root'
})
export class DaoMembershipContractService {
  constructor (
    private readonly commonContractService: CommonContractService,
    private readonly contractService: ContractService,
    private readonly signerService: SignerService,
    private readonly snackBar: MatSnackBar
  ) {
  }


  public voteForDAOMember (address: string, voteValue: 'like' | 'dislike'): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'wmgMembershipVoteForDAOMember', [
      {type: 'string', value: address},
      {type: 'string', value: voteValue}
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        // TODO: mess
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
      })
    )
  }


  addMember(address: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'mAddDAOMember', [
      {type: 'string', value: address}
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        // TODO: mess
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
      })
    )
  }

  proposeMember(address: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'aProposeCandidateForDAOMember', [
      {type: 'string', value: address}
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        // TODO: mess
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
      })
    )
  }

  rejectMember(address: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'mRejectDAOMember', [
      {type: 'string', value: address}
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        // TODO: mess
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
      })
    )
  }

  addWorkingGroup(address: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'mAddWorkingGroup', [
      {type: 'string', value: address}
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        // TODO: mess
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
      })
    )
  }

  addMembershipWorkingGroup(address: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'mAddMembershipWorkingGroup', [
      {type: 'string', value: address}
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        // TODO: mess
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
      })
    )
  }

}
