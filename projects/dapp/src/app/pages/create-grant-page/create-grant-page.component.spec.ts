import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGrantPageComponent } from './create-grant-page.component';

describe('CreateGrantPageComponent', () => {
  let component: CreateGrantPageComponent;
  let fixture: ComponentFixture<CreateGrantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGrantPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGrantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
