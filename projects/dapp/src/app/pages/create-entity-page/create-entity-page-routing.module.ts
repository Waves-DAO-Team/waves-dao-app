import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CreateEntityPageComponent } from './create-entity-page.component'

const routes: Routes = [
  {
    path: '',
    component: CreateEntityPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEntityPageRoutingModule { }
