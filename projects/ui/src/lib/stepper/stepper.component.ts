import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core'
import { MatStepper } from '@angular/material/stepper'
import { grantStatusEnum } from '@services/static/static.model'
import { StepperService } from '@services/stepper/stepper.service'
import { combineLatest, Subject } from 'rxjs'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'ui-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper | undefined
  grantStatusEnum = grantStatusEnum
  grantStatus: string[] = []
  stepId = 0
  formalStatuses = this.stepperService.getFormalStatuses()
  setId$ = new Subject()
  stepperInit$ = new Subject()
  step$ = combineLatest([this.setId$, this.stepperInit$]).pipe(
    tap(([id, init]) => {
      if (id && typeof id === 'number' && init && this.stepper) {
        this.stepper.selectedIndex = id
        this.cdr.markForCheck()
      }
    })
  ).subscribe()

  @Input() set setType (type: 'disruptive' | 'interhack' | 'web3') {
    this.stepperService.setType(type)
    this.formalStatuses = this.stepperService.getFormalStatuses()
  }

  private statusInput = ''
  @Input() set status (data: string) {
    if (data) {
      this.statusInput = data
      this.stepId = this.stepperService.getActiveId(data)
      if (this.stepId) {
        this.setId$.next(this.stepId)
      }
    } else {
      this.statusInput = 'no_status'
      this.stepId = this.stepperService.getActiveId('no_status')
      this.setId$.next(0)
    }
  }

  get status (): string {
    return this.statusInput
  }


  constructor (private readonly cdr: ChangeDetectorRef, public stepperService: StepperService) {

  }

  ngAfterViewInit () {
    if (this.stepper) {
      this.stepper._getIndicatorType = () => 'number'
      this.stepperInit$.next(true)
    }
  }
}
