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
export class DisruptiveContractService {

  constructor (
      private commonContractService: CommonContractService,
      private contractService: ContractService,
      private readonly signerService: SignerService,
      private snackBar: MatSnackBar
  ) {}

  public addDAOMember (member: string) {
    return this.commonContractService.addDAOMember(member)
  }

  public addGroupMember (member: string) {
    return this.commonContractService.addGroupMember(member)
  }

  // Add task
  // Permission: only WG
  public addTask (taskName: string, link: string) {
    return this.commonContractService.addTask(taskName, link)
  }

  // Finished create task. Start voting
  // Permission: only WG
  public addReward (taskId: string, reward: string) {
    return this.commonContractService.addReward(taskId, reward)
  }

  public voteForTaskProposal (taskId: string, voteValue: 'like' | 'dislike'): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'voteForTaskProposal', [
      { type: 'string', value: taskId },
      { type: 'string', value: voteValue }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
      })
    )
  }

  public finishTaskProposalVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishTaskProposalVoting', [
      { type: 'string', value: taskId }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.finishTaskProposalVoting'), translate('messages.ok'))
      })
    )
  }

  public applyForTask (taskId: string, teamName: string, link: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'applyForTask', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamName },
      { type: 'string', value: link }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open('Transaction is complete', translate('messages.ok'))
      })
    )
  }

  public voteForApplicant (taskId: string, teamIdentifier: string, voteValue: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'voteForApplicant', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamIdentifier },
      { type: 'string', value: voteValue }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap((e) => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.voteForApplicant'), translate('messages.ok'))
      })
    )
  }

  public finishApplicantsVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishApplicantsVoting', [
      { type: 'string', value: taskId }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.finishApplicantsVoting'), translate('messages.ok'))
      })
    )
  }

  public startWork (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'startWork', [
      { type: 'string', value: taskId }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.startWork'), translate('messages.ok'))
      })
    )
  }

  public rejectTask (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'rejectTask', [
      { type: 'string', value: taskId }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.rejectTask'), translate('messages.ok'))
      })
    )
  }

  public acceptWorkResult (taskId: string, reportLink: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'acceptWorkResult', [
      { type: 'string', value: taskId },
      { type: 'string', value: reportLink }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.rejectTask'), translate('messages.ok'))
      })
    )
  }
}
