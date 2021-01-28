import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingPageComponent implements OnInit {
  constructor () { }

  ngOnInit (): void {
  }
}
