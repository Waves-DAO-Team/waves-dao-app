import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MasterSettingPageComponent } from '@pages/master-setting-page/master-setting-page.component'
import { MasterSettingPageGuard } from '@pages/master-setting-page/master-setting-page.guard'

const routes: Routes = [
  {
    path: '',
    component: MasterSettingPageComponent,
    pathMatch: 'full',
    canActivate: [MasterSettingPageGuard],
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSettingPageRoutingModule { }