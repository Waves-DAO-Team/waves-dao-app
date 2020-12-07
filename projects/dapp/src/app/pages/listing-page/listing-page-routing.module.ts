import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ListingPageComponent } from './listing-page.component'

const routes: Routes = [
  {
    path: '',
    component: ListingPageComponent,
    pathMatch: 'full'
  }
  // {
  //   path: '',
  //   component: ContractMenuComponent,
  //   outlet: 'contract-menu'
  // }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingPageRoutingModule { }
