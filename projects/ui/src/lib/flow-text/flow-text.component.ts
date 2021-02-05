import {Component, Input, OnInit} from '@angular/core';
import {filter, map, repeatWhen, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {GrantTypesEnum} from "@services/static/static.model";
import {combineLatest, merge, Observable, Subject} from "rxjs";
import {translate} from "@ngneat/transloco";

@Component({
  selector: 'ui-flow-text',
  templateUrl: './flow-text.component.html',
  styleUrls: ['./flow-text.component.scss']
})
export class FlowTextComponent implements OnInit {

  public grantUrl$: Observable<GrantTypesEnum> = this.route.paramMap
    .pipe(
      // @ts-ignore
      filter( e => e && e.params && e.params.contractType),
      // @ts-ignore
      map((e) => e.params.contractType),
      tap( e => console.log('+++data', e))
    )

  // private status$: Subject<string> = new Subject()
  private status$: Subject<string> = new Subject<string>()

  public content$ = combineLatest([this.grantUrl$, this.status$])
    .pipe(
      // repeatWhen(() => this.status$),
      map(

        ([grantType, status]) => {
          let data = {
            status: '',
            flow: '',
          }
          data.status = translate('listing.status.' + status)
          if(grantType === GrantTypesEnum.disruptive || grantType === GrantTypesEnum.web3) {
            data.flow = 'test'
          } else {
            data.flow = 'test1'
          }
          console.log('+data', data)
          return data
        }
      )
    )

  @Input() set status(data: string) {
    console.log('++data', data)
    this.status$.next(data)
  }


  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
