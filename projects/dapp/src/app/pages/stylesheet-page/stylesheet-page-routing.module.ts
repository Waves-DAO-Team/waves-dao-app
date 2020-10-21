import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { StylesheetPageComponent } from '@pages/stylesheet-page/stylesheet-page.component'

const routes: Routes = [
  {
    path: '',
    component: StylesheetPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StylesheetPageRoutingModule { }
