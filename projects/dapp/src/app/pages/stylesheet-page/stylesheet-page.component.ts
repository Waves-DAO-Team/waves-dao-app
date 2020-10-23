import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-stylesheet-page',
  templateUrl: './stylesheet-page.component.html',
  styleUrls: ['./stylesheet-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StylesheetPageComponent implements OnInit {
  ngOnInit (): void {}
}
