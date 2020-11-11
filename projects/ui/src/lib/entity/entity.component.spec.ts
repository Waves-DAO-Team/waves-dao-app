import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EntityComponent } from './entity.component'
import { UserService } from '@services/user/user.service'
import { SignerService } from '@services/signer/signer.service'
import { provideApi } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TranslocoModule } from '@ngneat/transloco'

describe('EntityComponent', () => {
  let component: EntityComponent
  let fixture: ComponentFixture<EntityComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, TranslocoModule],
      declarations: [EntityComponent],
      providers: [UserService, provideApi()]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
