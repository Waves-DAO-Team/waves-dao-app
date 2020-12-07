import { Injectable } from '@angular/core'
import { ContractService } from '@services/contract/contract.service'
import { SignerService } from '@services/signer/signer.service'
import { CommonContractService } from './common-contract.service'

@Injectable({
  providedIn: 'root'
})
export class InterhackContractService {
  // ToDo change to waitTx function or else
  private readonly averageOperationSpeed = 10000

  constructor (
      private commonContractService: CommonContractService,
  ) {}

  // Add DAO Members
  public addDAOMember (member: string) {
    return this.commonContractService.addDAOMember(member)
  }

  // ADD work group user
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
}
