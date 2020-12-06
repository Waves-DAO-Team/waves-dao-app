import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { LISTING_PAGE_PROVIDERS } from '@pages/listing-page/listing-page.providers'
import { ABOUT_PAGE_PROVIDERS } from './about-page.provider'

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ABOUT_PAGE_PROVIDERS
})
export class AboutPageComponent implements OnInit {
  ngOnInit (): void {}
  constructor (private location: Location) {
  }

  goBack (): void {
    this.location.back()
  }
}
