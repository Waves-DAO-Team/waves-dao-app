import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'ui-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {
  @Input() tags: string[] = []
  @Output() selectedTag = new EventEmitter<string>();
  lastTag = ''

  constructor () {
  }

  ngOnInit (): void {
    this.select('all')
  }

  select (tag: string): void {
    console.log(tag, this.lastTag, tag === this.lastTag)
    if (this.lastTag === tag) {
      this.lastTag = ''
      this.selectedTag.emit('')
    } else {
      this.lastTag = tag
      this.selectedTag.emit(tag)
    }
  }
}
