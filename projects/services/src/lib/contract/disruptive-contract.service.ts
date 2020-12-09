import { Injectable } from '@angular/core'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { CommonContractService } from '@services/contract/common-contract.service'
import { catchError, tap } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { EMPTY } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class DisruptiveContractService {
  // ToDo change to waitTx function or else
  private readonly averageOperationSpeed = 10000

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

  public voteForTaskProposal (taskId: string, voteValue: 'like' | 'dislike') {
    this.signerService.invoke(this.contractService.getAddress(), 'voteForTaskProposal', [
      { type: 'string', value: taskId },
      { type: 'string', value: voteValue }
    ])
      .catch((res) => {
        this.snackBar.open(`voteForTaskProposal catch: ${res}`, '', { duration: 3000 })
      })
      .then((res) => {
      // @ts-ignore
        this.popupService.add(res.toString(), 'voteForTaskProposal then')
      })
      .finally(() => {
        this.snackBar.open('voteForTaskProposal finally', '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
  }

  public finishTaskProposalVoting (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'finishTaskProposalVoting', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.snackBar.open(`finishTaskProposalVoting catch ${res}`, '', { duration: 3000 })
      })
      .then((res) => {
        this.snackBar.open(`finishTaskProposalVoting then ${JSON.stringify(res)}`, '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
      .finally(() => {
        this.snackBar.open('finishTaskProposalVoting finally', '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
  }

  public applyForTask (taskId: string, teamName: string, link: string) {
    console.log('applyForTask', taskId, teamName, link)
    // this.popupService.add(`${taskId} ${teamName} ${link}`, 'applyForTask')
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'applyForTask', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamName },
      { type: 'string', value: link }
    ]).pipe(
      catchError((error) => {
        this.snackBar.open(error.message, translate('messages.ok'))
        return EMPTY
      }),
      tap((e) => {
        this.contractService.refresh()
        this.snackBar.open('Transaction is complete', translate('messages.ok'))
      })
    )
  }

  public voteForApplicant (taskId: string, teamIdentifier: string, voteValue: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'voteForApplicant', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamIdentifier },
      { type: 'string', value: voteValue }
    ])
      .catch((res) => {
        this.snackBar.open(`voteForApplicant catch: ${res}`, '', { duration: 3000 })
      })
      .then(res => {
        this.snackBar.open(`voteForApplicant then: ${JSON.stringify(res)}`, '', { duration: 3000 })
      })
      .finally(() => {
        this.snackBar.open('voteForApplicant finally', '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
  }

  public finishApplicantsVoting (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'finishApplicantsVoting', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.snackBar.open(`finishApplicantsVoting catch: ${res}`, '', { duration: 3000 })
      })
      .then((res) => {
        this.snackBar.open(`finishApplicantsVoting then: ${JSON.stringify(res)}`, '', { duration: 3000 })
      })
      .finally(() => {
        this.snackBar.open('finishApplicantsVoting finally', '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
  }

  public startWork (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'startWork', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.snackBar.open(res, '', { duration: 3000 })
      })
      .then((res) => {
        this.snackBar.open(JSON.stringify(res), '', { duration: 3000 })
      })
      .finally(() => {
        this.snackBar.open('startWork finally', '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
  }

  public rejectTask (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'rejectTask', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.snackBar.open(`rejectTask catch: ${res}`, '', { duration: 3000 })
      })
      .then((res) => {
        this.snackBar.open(`rejectTask then: ${JSON.stringify(res)}`, '', { duration: 3000 })
      })
      .finally(() => {
        this.snackBar.open('rejectTask finally', '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
  }

  public acceptWorkResult (taskId: string, reportLink: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'acceptWorkResult', [
      { type: 'string', value: taskId },
      // { type: 'string', value: teamIdentifier }
      { type: 'string', value: reportLink }
    ])
      .catch((res) => {
        this.snackBar.open(`acceptWorkResult catch: ${res}`, '', { duration: 3000 })
      })
      .then((res) => {
        this.snackBar.open(`acceptWorkResult then: ${res}`, '', { duration: 3000 })
      })
      .finally(() => {
        this.snackBar.open('acceptWorkResult finally', '', { duration: 3000 })
        this.contractService.doRefreshTimeOut()
      })
  }
}
