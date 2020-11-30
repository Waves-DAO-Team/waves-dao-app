/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash'
import { ContractGrantAppModel } from '@services/contract/contract.model'

@Pipe({ name: 'sortByTeam' })
export class SortByTeamPipe implements PipeTransform {
  transform (value: ContractGrantAppModel[], order = '', column: string = ''): ContractGrantAppModel[] {
    value = _.orderBy(value, ['score', 'value'], ['asc'])
    value = _.orderBy(value, ['process', 'value'], ['asc'])
    return value
  }
}
