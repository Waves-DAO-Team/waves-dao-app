import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[rewardDirective]'
})
export class RewardDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('blur') blur() {
    this.el.nativeElement.value = this.format(this.el.nativeElement.value)
  }

  format(str: string) {
    let res = parseFloat(str).toFixed(2).toString()
    if(res === 'NaN') {
      res = parseFloat('0').toFixed(2).toString()
    }
    return res
  }

}
