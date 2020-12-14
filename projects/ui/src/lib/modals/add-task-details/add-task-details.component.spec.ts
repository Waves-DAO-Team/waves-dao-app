import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskDetailsComponent } from './add-task-details.component';

describe('AddTaskDetailsComponent', () => {
  let component: AddTaskDetailsComponent;
  let fixture: ComponentFixture<AddTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
