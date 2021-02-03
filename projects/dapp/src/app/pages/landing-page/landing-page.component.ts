import {ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GrantsVariationType} from "@services/static/static.model";
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from "@constants";
import {StaticService} from "@services/static/static.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  public readonly grantsVariationsList: Observable<GrantsVariationType[]> =
    this.staticService.getContactsList()

  constructor (
    public cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(API) public readonly api: AppApiInterface,
    private staticService: StaticService
  ) { }

  ngOnInit (): void {}

  ngOnDestroy () {}
}
