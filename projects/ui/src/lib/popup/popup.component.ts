import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PopupService} from "@services/popup/popup.service";
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import {tap} from "rxjs/operators";

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);
const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
]);
@Component({
  selector: 'ui-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [fadeAnimation, listAnimation]
})
export class PopupComponent implements OnInit, OnDestroy {

  constructor(public popupService: PopupService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

}
