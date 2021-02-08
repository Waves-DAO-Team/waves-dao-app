import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {map} from 'rxjs/operators'
import {IUrl} from "@ui/all-teams-btn/all-teams-btn.interface";

@Component({
  selector: 'ui-all-teams-btn',
  templateUrl: './all-teams-btn.component.html',
  styleUrls: ['./all-teams-btn.component.scss']
})
export class AllTeamsBtnComponent implements OnInit {


  public grantUrl$ = this.route.paramMap
    .pipe(
      map( e => {
        let res: IUrl = {
          contractType: e.get('contractType') || '',
          entityId: e.get('entityId') || ''
        }
        return res
      })
    )

  constructor (
    public route: ActivatedRoute
  ) { }

  ngOnInit (): void {
  }

}
