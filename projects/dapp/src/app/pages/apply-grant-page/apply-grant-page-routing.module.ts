import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ApplyGrantPageComponent } from '@pages/apply-grant-page/apply-grant-page.component'

const routes: Routes = [
  {
    path: '',
    component: ApplyGrantPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyGrantPageRoutingModule { }
