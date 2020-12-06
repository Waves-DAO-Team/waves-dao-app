import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EntityPageComponent } from './entity-page.component'
import { ContractMenuComponent } from '@ui/contract-menu/contract-menu.component'

const routes: Routes = [
  {
    path: '',
    component: EntityPageComponent,
    pathMatch: 'full',
    data: {}
  },
  {
    path: '',
    component: ContractMenuComponent,
    outlet: 'contract-menu'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityPageRoutingModule { }
