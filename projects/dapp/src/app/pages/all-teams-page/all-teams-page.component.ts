import {Component, Inject, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {LoadingWrapperModel} from "@libs/loading-wrapper/loading-wrapper";
import {ContractGrantAppModel, ContractGrantModel, TeamsScoreLinkModel} from "@services/contract/contract.model";
import {filter, map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ALL_TEAM, ALL_TEAM_PAGE_PROVIDERS} from "./all-teams-page-routing.providers";

@Component({
  selector: 'app-all-teams-page',
  templateUrl: './all-teams-page.component.html',
  styleUrls: ['./all-teams-page.component.scss'],
  providers: ALL_TEAM_PAGE_PROVIDERS
})
export class AllTeamsPageComponent {

  public title$: Observable<String> = this.entity.data$
    .pipe(
      tap((data) => console.log('---1-0', data)),
      filter((data) => data.title != undefined && data.title.value != undefined),
      // @ts-ignore
      map((data) => data.title.value),
      tap((data) => console.log('---1-1', data))
    )

  // score name about
  // public teams$: Observable<TeamsScoreLinkModel[]> = this.entity.data$
  //   .pipe(
  //     filter((data) => data != undefined && data.app != undefined),
  //     map((data) => data.app),
  //     map((data) => {
  //       let res: TeamsScoreLinkModel[] = []
  //       if(data) {
  //         data.forEach((d) => {
  //           res.push({
  //             name: d.name.value,
  //             link: d.link.value,
  //             score: d.score != undefined ? d.score.value : 0
  //           })
  //         })
  //       }
  //       return res
  //     }),
  //     tap((data) => console.log('---2', data))
  //   )

  constructor(
    private readonly location: Location, // eslint-disable-line
    @Inject(ALL_TEAM) public entity: LoadingWrapperModel<ContractGrantModel>, // eslint-disable-line
  ) {
  }

  goBack(): void {
    this.location.back()
  }

}
