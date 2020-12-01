import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EditGrantPageComponent } from '@pages/edit-grant-page/edit-grant-page.component'
import { EditGrantPageGuard } from '@pages/edit-grant-page/edit-grant-page.guard'

const routes: Routes = [
  {
    path: '',
    component: EditGrantPageComponent,
    pathMatch: 'full',
    canActivate: [EditGrantPageGuard],
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditGrantPageRoutingModule { }
