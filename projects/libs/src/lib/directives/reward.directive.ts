import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[rewardDirective]'
})
// 1 000 000
// 1 000 000.00
export class RewardDirective {
  maxVal = 1000000
  lastSelectionStart = 0

  constructor (private readonly el: ElementRef) {} // eslint-disable-line

  @HostListener('keyup') blur (): void {
    this.el.nativeElement.value = this.format(this.el.nativeElement.value)
  }

  format (str: string): string {
    this.lastSelectionStart = this.el.nativeElement.selectionStart
    this.cursorJumpAtBeginningOfInputGuard(str)
    str = this.numberGuard(str)
    let res = str
    res = this.isNan(res)
    res = this.maxValGuard(res)
    res = this.numberWithSpaces(res)
    res = this.fractionalGuard(res)
    res = this.positionGuard(str, res)
    return res
  }

  //  1000000.00 =>  1 000 000.00
  numberWithSpaces (x: string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  private isNan (num: string): string {
    if (num === 'NaN') {
      num = parseFloat('0').toFixed(2).toString()
    }
    return num
  }

  private fractionalGuard (num: string): string {
    const fractional = num.split('.')[1]
    const int = num.split('.')[0]
    if (!num.includes('.')) {
      num = parseFloat(num).toFixed(2).toString()
    } else if (fractional.length === 1) {
      num += '0'
    } else if (fractional.length > 2) {
      num = int + '.' + fractional.substring(0, 2)
    }

    return num
  }

  private cursorJumpAtBeginningOfInputGuard (num: string) {
    if (num.length < 2) {
      setTimeout(() => {
        this.jumpTo(1)
      })
    }
  }

  private numberGuard (num: string): string {
    return num.replace(/[^\d.]/ig, '').replace(/\s/g, '')
  }

  private maxValGuard (num: string): string {
    if (parseFloat(num) > this.maxVal) {
      return this.maxVal.toFixed(2).toString()
    }
    return num
  }

  private setCharAt (str: string, index: number, chr: string): string {
    if (index > str.length - 1) { return str }
    return str.substring(0, index) + chr + str.substring(index)
  }

  private jumpTo (position: number): void {
    setTimeout(() => {
      this.el.nativeElement.setSelectionRange(position, position)
    })
  }

  private positionGuard (str: string, res: string): string {
    if (str.split(' ').length !== res.split(' ').length) {
      this.jumpTo(this.lastSelectionStart)
    }
    return res
  }
}
