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
    let sorted = _.sortBy(value, (e) => {
      return e?.score?.solution?.value;
    }).reverse();
    return sorted
  }
}
