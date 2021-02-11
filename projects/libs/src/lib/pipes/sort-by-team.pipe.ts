/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash'
import { ContractGrantAppModel } from '@services/contract/contract.model'

@Pipe({ name: 'sortByTeam' })
export class SortByTeamPipe implements PipeTransform {
  transform (value: ContractGrantAppModel[], order: string = 'asc'): ContractGrantAppModel[] {
    value = _.orderBy(value, ['square', 'value'], [order === 'desc' ? order : 'asc'])
    value = _.orderBy(value, ['process', 'value'], [order === 'desc' ? order : 'asc'])
    return value
  }
}
