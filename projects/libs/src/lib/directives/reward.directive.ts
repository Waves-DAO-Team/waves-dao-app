import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[rewardDirective]'
})
export class RewardDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value']) input() {
    if(this.el.nativeElement.value) {
      this.el.nativeElement.value = this.format(this.el.nativeElement.value)
    }
  }

  format(str: string) {
    str = parseInt(str.replace(/\D+/g,"")).toString()
    if(str.length < 3) {
      str += '00'
    }
    if(str.length > 2) {
      str = str.substr(0, str.length - 2) + '.' + str.substr(str.length - 2, str.length)
    }
    return str
  }

}
