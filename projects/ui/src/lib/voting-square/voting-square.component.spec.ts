import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingSquareComponent } from './voting-square.component';

describe('VotingSquareComponent', () => {
  let component: VotingSquareComponent;
  let fixture: ComponentFixture<VotingSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
