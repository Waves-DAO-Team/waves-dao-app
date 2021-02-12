import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
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
export class BodyComponent implements AfterViewChecked {
  @Input() link: string | null = null
  @Input() grant: ContractGrantModel | null = null
  @ViewChild('entityBody') entityBodyElementRef: ElementRef | undefined
  public mdHeight = 0
  public isShowFullMD = false
  public isShowFullMDBtn = false

  environment: {
    showDevTools: boolean
  } = environment

  mdTemp: string | null = null

  @Input() set md (value: string | null) {
    this.mdTemp = value
    this.cdr.markForCheck()
  }

  get md (): string | null {
    return this.mdTemp
  }

  constructor (
    public cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) { }


  toggleFullMD (): void {
    this.isShowFullMD = !this.isShowFullMD
    // this.cdr.markForCheck()
  }


  ngAfterViewChecked (): void {
    if (this.entityBodyElementRef) {

      const scrollHeight = this.entityBodyElementRef.nativeElement.scrollHeight
      // const scrollHeight = this.elementRef.nativeElement.offsetHeight + 100
      console.log('+++1',scrollHeight, scrollHeight > 480)
      if (this.mdHeight !== scrollHeight)
        {setTimeout(() => this.cdr.markForCheck(), 0)}
      this.mdHeight = scrollHeight
      if (this.mdHeight > 480) {
        this.isShowFullMDBtn = true
      }
    }
  }

}
