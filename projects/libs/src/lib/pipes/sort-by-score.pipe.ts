import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash'
import {IScore} from '@services/interface'

@Pipe({ name: 'sortByScore' })
export class SortByScorePipe implements PipeTransform {
  transform (value: IScore.IUnit[]): IScore.IUnit[] {
    return _.sortBy(value, (e) => e.square.score).reverse()
  }
}

