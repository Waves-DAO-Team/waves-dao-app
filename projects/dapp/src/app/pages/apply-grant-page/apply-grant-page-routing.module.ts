import { NgModule } from '@angular/core'
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { ApplyGrantPageComponent } from '@pages/apply-grant-page/apply-grant-page.component'
import { AuthGuard } from '@pages/apply-grant-page/AuthGuard'

const routes: Routes = [
  {
    path: '',
    component: ApplyGrantPageComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyGrantPageRoutingModule { }
