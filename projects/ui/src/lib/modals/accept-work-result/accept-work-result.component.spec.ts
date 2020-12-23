import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptWorkResultComponent } from './accept-work-result.component';

describe('AcceptWorkResultComponent', () => {
  let component: AcceptWorkResultComponent;
  let fixture: ComponentFixture<AcceptWorkResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptWorkResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptWorkResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
