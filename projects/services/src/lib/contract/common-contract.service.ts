import { Injectable } from '@angular/core'
import { ContractService } from '@services/contract/contract.service'
import { SignerService } from '@services/signer/signer.service'
import { PopupService } from '@services/popup/popup.service'

@Injectable({
  providedIn: 'root'
})
export class CommonContractService {
  // ToDo change to waitTx function or else
  private readonly averageOperationSpeed = 10000

  constructor (
      private contractService: ContractService,
      private readonly signerService: SignerService,
      private popupService: PopupService
  ) {}

  public addDAOMember (members: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'addDAOMember', [
      { type: 'string', value: members }
    ])
      .catch((res) => {
        this.popupService.add(res, 'addDAOMember catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'addDAOMember then')
        setTimeout(() => {
          this.contractService.refresh()
        }, this.averageOperationSpeed)
      })
      .finally(() => {
        this.popupService.add('', 'addDAOMember finally')
        this.contractService.doRefreshTimeOut()
      })
  }

  public addGroupMember (members: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'addGroupMember', [
      { type: 'string', value: members }
    ])
      .catch((res) => {
        this.popupService.add(res, 'addGroupMember catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'addGroupMember then')
        this.contractService.doRefreshTimeOut()
      })
      .finally(() => {
        this.popupService.add('', 'addGroupMember finally')
        this.contractService.doRefreshTimeOut()
      })
  }

  public addTask (taskName: string, link: string) {
    this.signerService.invoke(this.contractService.getAddress(), 'addTask', [
      { type: 'string', value: taskName },
      { type: 'string', value: link }
    ])
      .catch((res) => {
        this.popupService.add(res, 'addTask catch')
      })
      .then((res) => {
      // @ts-ignore
        this.popupService.add(res.toString(), 'addTask then')
      })
      .finally(() => {
        this.popupService.add('', 'addTask finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }

  public addTaskDetails (taskId: string, reward: number) {
    console.log('addTaskDetails:', taskId, reward)
    this.signerService.invoke(this.contractService.getAddress(), 'addTaskDetails',
      [{ type: 'string', value: taskId }],
      [{ assetId: 'WAVES', amount: reward }])
      .catch((res) => {
        this.popupService.add(res, 'addTaskDetails catch')
      })
      .then((res) => {
      // @ts-ignore
        this.popupService.add(res.toString(), 'addTaskDetails then')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
      .finally(() => {
        this.popupService.add('', 'addTaskDetails finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.contractService.doRefreshTimeOut()
      })
  }
}
