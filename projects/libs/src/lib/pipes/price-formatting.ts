import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'PriceFormatting' })
export class PriceFormattingPipe implements PipeTransform {
  transform (value: string | number | bigint, decimals: number): string {
    value = value && typeof value === 'string' ? parseInt(value, 10) : value as number
    value = (value / 100000000).toFixed(decimals)
    value = this.numberWithSpaces(value)
    return value
  }

  numberWithSpaces (x: string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
}
