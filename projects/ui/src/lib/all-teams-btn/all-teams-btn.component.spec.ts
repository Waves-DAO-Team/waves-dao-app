import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamsBtnComponent } from './all-teams-btn.component';

describe('AllTeamsBtnComponent', () => {
  let component: AllTeamsBtnComponent;
  let fixture: ComponentFixture<AllTeamsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTeamsBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
