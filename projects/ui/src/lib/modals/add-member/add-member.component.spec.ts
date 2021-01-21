import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddMemberComponent} from './add-member.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {getTranslocoModule} from "@dapp/src/app/transloco-module.spec";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotFoundPageModule} from "@pages/not-found-page/not-found-page.module";
import {LoadingPageModule} from "@pages/loading-page/loading-page.module";
import {AboutPageComponent} from "@pages/about-page/about-page.component";
import {provideApi, provideAppConstants} from "@constants";
import {ContractProviderDefine} from "@services/contract/contract-provider-factory";
import {CONTRACT} from "@pages/about-page/about-page.provider";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {EntityModule} from "@ui/entity/entity.module";
import {DIALOG_DATA} from "@ui/dialog/dialog.tokens";
import {PipesModule} from "@libs/pipes/pipes.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {EntityPageComponent} from "@pages/entity-page/entity-page.component";
import {ContractService} from "@services/contract/contract.service";
import {ENTITY_PAGE_PROVIDERS} from "@pages/entity-page/entity-page.providers";

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMemberComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        PipesModule,
        getTranslocoModule(),
        LoadingPageModule,
        NoopAnimationsModule
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        ENTITY_PAGE_PROVIDERS
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
