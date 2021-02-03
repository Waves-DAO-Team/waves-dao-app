import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ListingPageComponent } from './listing-page.component'
import { DialogModule } from '@ui/dialog/dialog.module'

const routes: Routes = [
  {
    path: '',
    component: ListingPageComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes), DialogModule],
  exports: [RouterModule]
})
export class ListingPageRoutingModule {}
