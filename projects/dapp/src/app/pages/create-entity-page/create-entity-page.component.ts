import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-create-entity-page',
  templateUrl: './create-entity-page.component.html',
  styleUrls: ['./create-entity-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEntityPageComponent implements OnInit {
  ngOnInit (): void {}
}
