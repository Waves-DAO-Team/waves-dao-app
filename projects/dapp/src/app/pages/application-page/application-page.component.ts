import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationPageComponent implements OnInit {
  ngOnInit (): void {}
}
