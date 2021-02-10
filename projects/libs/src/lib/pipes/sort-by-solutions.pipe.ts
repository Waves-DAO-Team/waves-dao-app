/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash'
import { ContractGrantAppModel } from '@services/contract/contract.model'

@Pipe({ name: 'sortBySolutions' })
export class SortBySolutionsPipe implements PipeTransform {
  transform (value: ContractGrantAppModel[], order: string = 'asc'): ContractGrantAppModel[] {
    console.log('this.detectSortType(value)', this.detectSortType(value), value)
    if (this.detectSortType(value) === 'team') {
      // value = _.orderBy(value, ['score', 'value'], [order === 'desc' ? order : 'asc'])
      // value = _.orderBy(value, ['process', 'value'], [order === 'desc' ? order : 'asc'])
      value = _.sortBy(value, (e) => {
        return e?.score?.applicant?.value;
      }).reverse();
    } else {
      value = _.sortBy(value, (e) => {
        return e?.score?.solution?.value;
      }).reverse();
    }
    return value
  }
  private detectSortType(value: ContractGrantAppModel[]): 'team' | 'solution' {
    let isTeam = true
    value.forEach((e)=>{
      if (e.score?.solution?.value) {
        isTeam = false
      }
    })
    return isTeam ? 'team' : 'solution'
  }
}
