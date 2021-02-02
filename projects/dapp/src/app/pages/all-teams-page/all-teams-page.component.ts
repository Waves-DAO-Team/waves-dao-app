import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-all-teams-page',
  templateUrl: './all-teams-page.component.html',
  styleUrls: ['./all-teams-page.component.scss']
})
export class AllTeamsPageComponent {

  constructor(
    private readonly location: Location, // eslint-disable-line
  ) { }

  goBack (): void {
    this.location.back()
  }

}
