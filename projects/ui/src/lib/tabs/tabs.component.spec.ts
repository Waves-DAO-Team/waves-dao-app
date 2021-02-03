import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TabsComponent } from './tabs.component'
import {MatTabsModule} from '@angular/material/tabs'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('TabsComponent', () => {
  let component: TabsComponent
  let fixture: ComponentFixture<TabsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsComponent ],
      imports: [ MatTabsModule, NoopAnimationsModule]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
