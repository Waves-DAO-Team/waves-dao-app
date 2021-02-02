import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamsPageComponent } from './all-teams-page.component';

describe('AllTeamsPageComponent', () => {
  let component: AllTeamsPageComponent;
  let fixture: ComponentFixture<AllTeamsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTeamsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
