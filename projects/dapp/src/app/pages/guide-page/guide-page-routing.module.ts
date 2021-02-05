import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GuidePageComponent } from './guide-page.component'

const routes: Routes = [
  {
    path: '',
    component: GuidePageComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidePageRoutingModule { }
