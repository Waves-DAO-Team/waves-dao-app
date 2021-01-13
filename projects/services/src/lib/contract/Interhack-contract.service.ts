import { Injectable } from '@angular/core'
import { CommonContractService } from './common-contract.service'
import {EMPTY, Observable} from "rxjs";
import {TransactionsSuccessResult} from "@services/signer/signer.model";
import {catchError, tap} from "rxjs/operators";
import {translate} from "@ngneat/transloco";
import {SignerService} from "@services/signer/signer.service";
import {ContractService} from "@services/contract/contract.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class InterhackContractService {

  constructor (
    private commonContractService: CommonContractService,
    private contractService: ContractService,
    private readonly signerService: SignerService,
    private snackBar: MatSnackBar,
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

  public finishApplicantsVoting (taskId: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(this.contractService.getAddress(), 'finishApplicantsVoting', [
      {type: 'string', value: taskId}
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
}
