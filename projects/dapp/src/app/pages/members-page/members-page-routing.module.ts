import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MembersPageComponent } from '@pages/members-page/members-page.component'

const routes: Routes = [
  {
    path: '',
    component: MembersPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersPageRoutingModule { }
