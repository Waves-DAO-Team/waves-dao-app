import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'ui-all-teams-btn',
  templateUrl: './all-teams-btn.component.html',
  styleUrls: ['./all-teams-btn.component.scss']
})
export class AllTeamsBtnComponent implements OnInit {

  public grantUrl$ = this.route.paramMap
    .pipe(
      // @ts-ignore
      map((e) => e.params)
    )

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
