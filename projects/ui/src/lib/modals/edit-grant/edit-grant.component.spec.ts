import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrantComponent } from './edit-grant.component';

describe('EditGrantComponent', () => {
  let component: EditGrantComponent;
  let fixture: ComponentFixture<EditGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
