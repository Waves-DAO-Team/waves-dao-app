import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-guide-page',
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.scss']
})
export class GuidePageComponent implements OnInit, OnDestroy {

  constructor(private readonly location: Location) { }

  ngOnInit(): void {
  }

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy () {
    this.destroy()
  }

  private destroy() {

  }
}
