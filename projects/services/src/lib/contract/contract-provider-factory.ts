import { ContractService } from '@services/contract/contract.service'
import { translate, TranslocoService } from '@ngneat/transloco'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  LoadingWrapper,
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import { GrantsVariationType } from '@services/contract/contract.model'
import {
  catchError,
  map,
  publishReplay,
  refCount,
  switchMap,
  tap
} from 'rxjs/operators'
import { Observable } from 'rxjs'

export function ContractProviderFactory (
  contractService: ContractService,
  translocoService: TranslocoService,
  route: ActivatedRoute,
  router: Router,
  snackBar: MatSnackBar
): LoadingWrapperModel<GrantsVariationType> {
  return new LoadingWrapper(
    route.params.pipe(
      switchMap(({ contractType }): Observable<GrantsVariationType> => {
        return contractService.getContactInfo(contractType).pipe(
          map((contractInfo) => {
            if (!contractInfo) {
              throw new Error('Contact is not found')
            }

            return contractInfo
          })
        )
      }),
      catchError((error) => {
        // Todo обработать ошибки
        snackBar.open(error, translate('messages.ok'))
        throw new Error('Contract not found')
      }),
      tap((contract) => {
        // Side effect to change contract type
        // Delete change on service for all application
        contractService.switchContract(contract.type)
      }),
      publishReplay(1),
      refCount()
    )
  )
}
