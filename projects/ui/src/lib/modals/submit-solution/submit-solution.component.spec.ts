import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSolutionComponent } from './submit-solution.component';
import {provideApi, provideAppConstants} from "@constants";
import {UserService} from "@services/user/user.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {getTranslocoModule} from "@dapp/src/app/transloco-module.spec";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {EntityModule} from "@ui/entity/entity.module";
import {MarkdownModule} from "ngx-markdown";
import {TeamModule} from "@ui/team/team.module";
import {VoteForTaskModule} from "@ui/vote-for-task/vote-for-task.module";
import {StepperModule} from "@ui/stepper/stepper.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DIALOG_DATA} from "@ui/dialog/dialog.tokens";

describe('SubmitSolutionComponent', () => {
  let component: SubmitSolutionComponent;
  let fixture: ComponentFixture<SubmitSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        getTranslocoModule(),
        MatSnackBarModule,
        MarkdownModule,
        StepperModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [ SubmitSolutionComponent ],
      providers: [
        provideAppConstants(),
        provideApi(),
        UserService,
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
