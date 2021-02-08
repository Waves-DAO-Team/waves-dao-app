import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {IUrl} from '@services/interface'

@Component({
  selector: 'ui-all-teams-btn',
  templateUrl: './all-teams-btn.component.html',
  styleUrls: ['./all-teams-btn.component.scss']
})
export class AllTeamsBtnComponent implements OnInit {

  public grantUrl$: Observable<IUrl> = this.route.paramMap
    .pipe(
      map( e => {
        const res: IUrl = {
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
