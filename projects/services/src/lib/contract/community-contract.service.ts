import { Injectable } from '@angular/core'
import { catchError, tap } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { EMPTY, Observable } from 'rxjs'
import { CommonContractService } from '@services/contract/common-contract.service'
import { ContractService } from '@services/contract/contract.service'
import { SignerService } from '@services/signer/signer.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TransactionsSuccessResult } from '@services/signer/signer.model'
import {
  ContractDataRawModel,
} from '@services/contract/contract.model'
import {RequestModel} from '@services/request/request.model'

@Injectable({
  providedIn: 'root'
})
export class CommunityContractService {
  constructor (
    private readonly commonContractService: CommonContractService, // eslint-disable-line
    private readonly contractService: ContractService, // eslint-disable-line
    private readonly signerService: SignerService, // eslint-disable-line
    private readonly snackBar: MatSnackBar  // eslint-disable-line
  ) {
  }

  streamContractService (): Observable<RequestModel<ContractDataRawModel>> {
    return this.contractService.stream
  }

  public addTask (taskName: string, link: string, hash: string = ''): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addTask(taskName, link, hash)
  }

  public initTaskVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'initTaskVoting',
      [{ type: 'string', value: taskId }]
    )
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(translate(mes))
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.initTaskVoting'), translate('messages.ok'))
        })
      )
  }

  public addReward (taskId: string, reward: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'addReward',
      [
        { type: 'string', value: taskId },
        { type: 'integer', value: parseFloat(reward) }
      ]
    ).pipe(
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

  public voteForTaskProposal (taskId: string, voteValue: 'like' | 'dislike'): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'voteForTaskProposal', [
      { type: 'string', value: taskId },
      { type: 'string', value: voteValue }
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.voteForTaskProposal'), translate('messages.ok'))
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
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
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
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.voteForApplicant'), translate('messages.ok'))
      })
    )
  }

  public finishTaskProposalVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishTaskProposalVoting', [
      { type: 'string', value: taskId }
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(mes)
        return EMPTY
      }),
      tap(() => {
        this.contractService.refresh()
        this.snackBar.open(translate('messages.finishTaskProposalVoting'), translate('messages.ok'))
      })
    )
  }

  public startWork (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'startWork', [
      { type: 'string', value: taskId }
    ]).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(translate(mes))
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

  public acceptWorkResult (taskId: string, reportLink: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'acceptWorkResult',
      [{ type: 'string', value: taskId }, { type: 'string', value: reportLink }])
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

  resetHash (taskId: string, hash: string): Observable<TransactionsSuccessResult>  {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'resetHash',
      [
        {type: 'string', value: taskId},
        {type: 'string', value: hash}
      ]
    )
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(mes)
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('entity.reset_hash_complete'), translate('messages.ok'))
        })
      )
  }

}
