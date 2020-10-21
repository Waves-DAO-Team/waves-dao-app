import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AboutPageComponent } from './about-page.component'

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutPageRoutingModule { }
