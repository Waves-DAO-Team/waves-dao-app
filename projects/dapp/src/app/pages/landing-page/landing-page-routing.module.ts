import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LandingPageComponent } from './landing-page.component'

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
