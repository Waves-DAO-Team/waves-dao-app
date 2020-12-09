import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeGrantComponent } from './propose-grant.component';

describe('ProposeGrantComponent', () => {
  let component: ProposeGrantComponent;
  let fixture: ComponentFixture<ProposeGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeGrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
