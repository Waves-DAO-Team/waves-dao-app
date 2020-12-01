import { Injectable } from '@angular/core'
import { SignerService } from '@services/signer/signer.service'
import { PopupService } from '@services/popup/popup.service'
import { ContractService } from '@services/contract/contract.service'
import { CommonContractService } from '@services/contract/common-contract.service'

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
      private popupService: PopupService
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
  public addReward (taskId: string, reward: number) {
    return this.commonContractService.addReward(taskId, reward)
  }

  public voteForTaskProposal (taskId: string, voteValue: 'like' | 'dislike') {
    this.signerService.invoke(this.contractService.getAddress(), 'voteForTaskProposal', [
      { type: 'string', value: taskId },
      { type: 'string', value: voteValue }
    ])
      .catch((res) => {
        this.popupService.add(res, 'voteForTaskProposal this')
      })
      .then((res) => {
      // @ts-ignore
        this.popupService.add(res.toString(), 'voteForTaskProposal then')
      })
      .finally(() => {
        this.popupService.add('', 'voteForTaskProposal finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }

  public finishTaskProposalVoting (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'finishTaskProposalVoting', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'finishTaskProposalVoting')
      })
      .then((res) => {
      // @ts-ignore
        this.popupService.add(res.toString(), 'finishTaskProposalVoting then')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
      .finally(() => {
        this.popupService.add('', 'finishTaskProposalVoting finally')
        this.contractService.doRefreshTimeOut()
      })
  }

  public applyForTask (taskId: string, teamName: string, link: string): void {
    this.popupService.add(`${taskId} ${teamName} ${link}`, 'applyForTask')
    this.signerService.invoke(this.contractService.getAddress(), 'applyForTask', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamName },
      { type: 'string', value: link }
    ])
      .then((res) => {
        this.popupService.add(res.toString(), 'applyForTask then')
      })
      .catch((res) => {
        this.popupService.add(res, 'applyForTask catch')
      })
      .finally(() => {
        this.popupService.add('', 'applyForTask finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }

  public voteForApplicant (taskId: string, teamIdentifier: string, voteValue: string) {
    const text = `taskId:${taskId} teamIdentifier:${teamIdentifier} voteValue:${voteValue}`
    this.popupService.add(text, '==========================================voteForApplicant')
    this.signerService.invoke(this.contractService.getAddress(), 'voteForApplicant', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamIdentifier },
      { type: 'string', value: voteValue }
    ])
      .catch((res) => {
        this.popupService.add(res, 'voteForApplicant catch')
      })
      .then(res => {
        this.popupService.add(JSON.stringify(res), 'voteForApplicant catch')
      })
      .finally(() => {
        this.popupService.add('', 'voteForApplicant finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }

  public finishApplicantsVoting (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'finishApplicantsVoting', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'finishApplicantsVoting catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'finishApplicantsVoting then')
      })
      .finally(() => {
        this.popupService.add('', 'finishApplicantsVoting finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }

  public startWork (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'startWork', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'startWork catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'startWork then')
      })
      .finally(() => {
        this.popupService.add('', 'startWork finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }

  public rejectTask (taskId: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'rejectTask', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'rejectTask catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'rejectTask then')
      })
      .finally(() => {
        this.popupService.add('', 'rejectTask finally')
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
        this.popupService.add(res, 'acceptWorkResult catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'acceptWorkResult then')
      })
      .finally(() => {
        this.popupService.add('', 'acceptWorkResult finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }
}
