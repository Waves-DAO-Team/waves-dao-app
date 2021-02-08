import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTextComponent } from './flow-text.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TagModule} from '@ui/tag/tag.module';
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec';
import {RouterTestingModule} from '@angular/router/testing';

describe('FlowTextComponent', () => {
  let component: FlowTextComponent;
  let fixture: ComponentFixture<FlowTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, TagModule, getTranslocoModule(), RouterTestingModule],
      declarations: [ FlowTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
