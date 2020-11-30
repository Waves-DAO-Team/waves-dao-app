/*
 *ngFor="let c of oneDimArray | sortBy:'asc'"
 *ngFor="let c of arrayOfObjects | sortBy:'asc':'propertyName'"
*/
import {Pipe, PipeTransform} from '@angular/core';
import {orderBy} from 'lodash';
import * as _ from 'lodash';

@Pipe({name: 'sortByTeam'})
export class SortByTeamPipe implements PipeTransform {

  transform(value: any[], order = '', column: string = ''): any[] {
    value = _.orderBy(value, ['score', 'value'], ['asc'])
    value = _.orderBy(value, ['process', 'value'], ['asc'])
    return value;
  }
}
