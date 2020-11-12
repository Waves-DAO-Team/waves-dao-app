import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSettingPageComponent } from './master-setting-page.component';

describe('MasterSettingPageComponent', () => {
  let component: MasterSettingPageComponent;
  let fixture: ComponentFixture<MasterSettingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSettingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
