/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash'
import { ContractGrantAppModel } from '@services/contract/contract.model'

@Pipe({ name: 'sortBySolutions' })
export class SortBySolutionsPipe implements PipeTransform {
  transform (value: ContractGrantAppModel[]): ContractGrantAppModel[] {
    if (this.detectSortType(value) === 'team') {
      // value = _.orderBy(value, ['score', 'applicant', 'value'], [order === 'desc' ? order : 'asc'])
      value =_.sortBy(value, (e) => e?.score?.applicant?.value || 0).reverse()
    } else {
      value = _.sortBy(value, (e) => e?.score?.solution?.value || 0).reverse()
    }
    return value
  }
  private detectSortType (value: ContractGrantAppModel[]): 'team' | 'solution' {
    let isTeam = true
    value.forEach((e)=>{
      if (e.score?.solution?.value) {
        isTeam = false
      }
    })
    return isTeam ? 'team' : 'solution'
  }
}
