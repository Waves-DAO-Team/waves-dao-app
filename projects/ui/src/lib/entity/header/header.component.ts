import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() isShowRaw = false
  @Input() hash = ''
  @Input() grant = ''
  @Input() status = ''
  @Input() title = ''
  @Input() link = ''
  @Input() reward = 0
  @Input() headerControlsTemplate: TemplateRef<Component> | undefined

  constructor () { }

  ngOnInit (): void {
  }
}
