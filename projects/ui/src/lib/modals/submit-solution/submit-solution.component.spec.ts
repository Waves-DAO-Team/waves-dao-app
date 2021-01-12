import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSolutionComponent } from './submit-solution.component';

describe('SubmitSolutionComponent', () => {
  let component: SubmitSolutionComponent;
  let fixture: ComponentFixture<SubmitSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitSolutionComponent ]
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
