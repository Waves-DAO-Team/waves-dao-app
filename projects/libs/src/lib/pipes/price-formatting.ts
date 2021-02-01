import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'PriceFormatting' })
export class PriceFormattingPipe implements PipeTransform {
  transform (value: string | number): string {
    value = value.toString()
    value = this.numberWithSpaces(value)
    return value
  }

  numberWithSpaces (x: string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
}
