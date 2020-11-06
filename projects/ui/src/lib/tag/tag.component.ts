import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @Input() tags: string[] = []
}
