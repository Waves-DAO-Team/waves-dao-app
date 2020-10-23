import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityPageComponent implements OnInit {
  ngOnInit (): void {}
}
