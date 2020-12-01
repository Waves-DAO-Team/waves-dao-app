import { Injectable } from '@angular/core'
import { ContractService } from '@services/contract/contract.service'
import { SignerService } from '@services/signer/signer.service'
import { PopupService } from '@services/popup/popup.service'
import { CommonContractService } from './common-contract.service'

@Injectable({
  providedIn: 'root'
})
export class InterhackContractService {
  // ToDo change to waitTx function or else
  private readonly averageOperationSpeed = 10000

  constructor (
      private commonContractService: CommonContractService,
      private contractService: ContractService,
      private readonly signerService: SignerService,
      private popupService: PopupService
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
  public addReward (taskId: string, reward: number) {
    this.signerService.invoke(this.contractService.getAddress(), 'addReward',
      [{ type: 'string', value: taskId }],
      [{ assetId: 'WAVES', amount: reward }])
      .catch((res) => {
        this.popupService.add(res, 'addReward catch')
      })
      .then((res) => {
      // @ts-ignore
        this.popupService.add(res.toString(), 'addReward then')
        this.contractService.doRefreshTimeOut()
      })
      .finally(() => {
        this.popupService.add('', 'addReward finally')
        this.contractService.doRefreshTimeOut()
      })
  }
}
