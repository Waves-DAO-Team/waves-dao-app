import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import {environment} from '@dapp/src/environments/environment'
import {ContractGrantModel} from '@services/contract/contract.model'

@Component({
  selector: 'ui-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BodyComponent  {
  @Input() link: string | null = null
  @Input() grant: ContractGrantModel | null = null
  @ViewChild('entityBody') entityBodyElementRef: ElementRef | undefined;
  public mdHeight: number = 0
  public isShowFullMD: boolean = false
  public isShowFullMDBtn: boolean = false

  environment: {
    showDevTools: boolean
  } = environment

  mdTemp: string | null = null

  @Input() set md(value: string | null) {
    this.mdTemp = value
    this.cdr.markForCheck()
  }

  get md(): string | null {
    return this.mdTemp
  }

  constructor(public cdr: ChangeDetectorRef) {
  } // eslint-disable-line


  toggleFullMD() {
    this.isShowFullMD = !this.isShowFullMD
    // this.cdr.markForCheck()
  }


  ngAfterViewChecked(): void {
    if (this.entityBodyElementRef) {
      const scrollHeight = this.entityBodyElementRef.nativeElement.scrollHeight
      if (this.mdHeight != scrollHeight)
        setTimeout(() => this.cdr.markForCheck(), 0)
      this.mdHeight = scrollHeight
      if (this.mdHeight > 800)
        this.isShowFullMDBtn = true
    }
  }

}
