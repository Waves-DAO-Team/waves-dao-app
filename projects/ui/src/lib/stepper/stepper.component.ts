import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from "@angular/material/stepper";
import {GrantStatusEnum} from "@services/static/static.model";
import {StepperService} from "@services/stepper/stepper.service";

@Component({
  selector: 'ui-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterViewInit {

  grantStatusEnum = GrantStatusEnum
  grantStatus: string[] = []

  stepId: null | number = null

  formalStatuses = this.stepperService.getFormalStatuses()

  _status = ''
  @Input() set status(data: string) {
    if(data) {
      this._status = data
      this.stepId = this.stepperService.getActiveId(data)
      console.log("this.stepId ", this.stepId, data )
      if(this.stepper &&  this.stepId) {
        this.stepper.selectedIndex =  this.stepId
      }
    } else {
      this._status = 'no_status'
    }
  }
  get status(): string {
    return this._status
  }

  @ViewChild('stepper') stepper: MatStepper | undefined;

  constructor(public stepperService: StepperService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.stepper) {
      this.stepper._getIndicatorType = () => 'number'
    }
  }

}
