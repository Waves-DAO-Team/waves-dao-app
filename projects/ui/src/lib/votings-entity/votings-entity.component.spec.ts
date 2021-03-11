import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingsEntityComponent } from './votings-entity.component';

describe('VotingsEntityComponent', () => {
  let component: VotingsEntityComponent;
  let fixture: ComponentFixture<VotingsEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingsEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingsEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
