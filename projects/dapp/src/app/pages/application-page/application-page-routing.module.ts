import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ApplicationPageComponent } from './application-page.component'

const routes: Routes = [
  {
    path: '',
    component: ApplicationPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationPageRoutingModule { }
