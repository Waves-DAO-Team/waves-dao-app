import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnInit {
  @Input() link: string | null = null

  mdTemp: string | null = null
  @Input() set md (value: string | null) {
    this.mdTemp = value
    this.cdr.markForCheck()
  }

  get md (): string | null {
    return this.mdTemp
  }

  constructor (public cdr: ChangeDetectorRef) {} // eslint-disable-line

  ngOnInit (): void {
  }
}
