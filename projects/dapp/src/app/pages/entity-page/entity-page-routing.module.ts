import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EntityPageComponent } from './entity-page.component'

const routes: Routes = [
  {
    path: '',
    component: EntityPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityPageRoutingModule { }
