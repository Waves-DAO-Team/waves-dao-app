import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EntityPageRoutingModule } from './entity-page-routing.module'
import { EntityPageComponent } from './entity-page.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { EntityModule } from '@ui/entity/entity.module'
import { NotFoundPageModule } from '@pages/not-found-page/not-found-page.module'
import { LoadingPageModule } from '@pages/loading-page/loading-page.module'
import { DefaultTemplateComponent } from './default-template/default-template.component'

@NgModule({
  declarations: [EntityPageComponent, DefaultTemplateComponent],
  imports: [
    CommonModule,
    EntityPageRoutingModule,
    TranslocoModule,
    PipesModule,
    EntityModule,
    NotFoundPageModule,
    LoadingPageModule
  ]
})
export class EntityPageModule { }
