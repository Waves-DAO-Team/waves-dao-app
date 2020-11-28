import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {Location} from "@angular/common";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent implements OnInit {
  ngOnInit (): void {}
  constructor(private location: Location) {
  }

  goBack (): void {
    this.location.back()
  }
}
