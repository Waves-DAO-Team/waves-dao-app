import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash'
import { ContractGrantAppModel } from '@services/contract/contract.model'

@Pipe({ name: 'PriceFormatting' })
export class PriceFormattingPipe implements PipeTransform {
  transform (value: string ): string {
    value = this.numberWithSpaces(value)
    return value
  }

  numberWithSpaces (x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
}
