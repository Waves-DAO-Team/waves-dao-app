import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-collapse-container',
  templateUrl: './collapse-container.component.html',
  styleUrls: ['./collapse-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapseContainerComponent implements OnInit {
  isOpen = false
  @Input() status = ''
  @Input() title = ''
  @Input() rewardValue = ''
  @Input() routes = ''

  constructor () {
  }

  ngOnInit (): void {
  }
}
