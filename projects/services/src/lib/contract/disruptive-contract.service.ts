import {Injectable} from '@angular/core'
import {SignerService} from '@services/signer/signer.service'
import {ContractService} from '@services/contract/contract.service'
import {CommonContractService} from '@services/contract/common-contract.service'
import {catchError, tap} from 'rxjs/operators'
import {translate} from '@ngneat/transloco'
import {EMPTY, Observable} from 'rxjs'
import {MatSnackBar} from '@angular/material/snack-bar'
import {TransactionsSuccessResult} from '@services/signer/signer.model'

@Injectable({
  providedIn: 'root'
})
export class DisruptiveContractService {
  constructor (
    private readonly commonContractService: CommonContractService,
    private readonly contractService: ContractService,
    private readonly signerService: SignerService,
    private readonly snackBar: MatSnackBar
  ) {
  }

  public addDAOMember (member: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addDAOMember(member)
  }

  public addGroupMember (member: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addGroupMember(member)
  }

  // Add task
  // Permission: only WG
  public addTask (taskName: string, link: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addTask(taskName, link)
  }

  // Finished create task. Start voting
  // Permission: only WG
  public addReward (taskId: string, reward: string): Observable<TransactionsSuccessResult> {
    return this.commonContractService.addReward(taskId, reward)
  }

  public voteForTaskProposal (taskId: string, voteValue: 'like' | 'dislike'): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'voteForTaskProposal', [
      {type: 'string', value: taskId},
      {type: 'string', value: voteValue}
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

  public finishTaskProposalVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishTaskProposalVoting', [
      {type: 'string', value: taskId}
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

  public applyForTask (taskId: string, teamName: string, link: string, hash: string = ''): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'applyForTask', [
      {type: 'string', value: taskId},
      {type: 'string', value: teamName},
      {type: 'string', value: link},
      {type: 'string', value: hash}
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
      {type: 'string', value: taskId},
      {type: 'string', value: teamIdentifier},
      {type: 'string', value: voteValue}
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

  public enableSubmissions (taskId: string, juryList: string = ''): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.contractService.getAddress(),
      'enableSubmissions',
      [{type: 'string', value: taskId}, {type: 'string', value: juryList}])
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(translate(mes))
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.enable_submissions'), translate('messages.ok'))
        })
      )
  }

  public finishApplicantsVoting (taskId: string, winId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishApplicantsVoting', [
      {type: 'string', value: taskId},
      {type: 'string', value: winId}
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

  public startWork (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'startWork', [
      {type: 'string', value: taskId}
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
      {type: 'string', value: taskId}
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
      [{type: 'string', value: taskId}, {type: 'string', value: reportLink}])
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(translate(mes))
          return EMPTY
        }),
        tap(() => {
          this.contractService.refresh()
          this.snackBar.open(translate('messages.acceptWorkResult'), translate('messages.ok'))
        })
      )
  }

  submitSolution (taskId: string, solutionLink: string = '', hash: string = ''): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'submitSolution',
      [
        {type: 'string', value: taskId},
        {type: 'string', value: solutionLink},
        {type: 'string', value: hash}
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
          this.snackBar.open(translate('messages.submit_solution'), translate('messages.ok'))
        })
      )
  }

  voteForSolution (taskId: string, teamIdentifier: string, voteValue: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'voteForSolution',
      [
        {type: 'string', value: taskId},
        {type: 'string', value: teamIdentifier},
        {type: 'string', value: voteValue}
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
          this.snackBar.open(translate('entity.vote_for_solution'), translate('messages.ok'))
        })
      )
  }

  stopSubmissions (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'stopSubmissions',
      [
        {type: 'string', value: taskId}
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
          this.snackBar.open(translate('entity.stop_submissions'), translate('messages.ok'))
        })
      )
  }
}
