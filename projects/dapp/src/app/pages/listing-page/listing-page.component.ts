import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingPageComponent implements OnInit {
  constructor () {}

  ngOnInit (): void {
  }
}
