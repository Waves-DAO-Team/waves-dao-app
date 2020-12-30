import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAndSolutionsComponent } from './teams-and-solutions.component';

describe('TeamsAndSolutionsComponent', () => {
  let component: TeamsAndSolutionsComponent;
  let fixture: ComponentFixture<TeamsAndSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsAndSolutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAndSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
