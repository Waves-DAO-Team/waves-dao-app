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
    return parseFloat(str).toFixed(2).toString()
  }

}
