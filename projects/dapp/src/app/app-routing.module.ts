import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonLayoutComponent } from '@ui/layout/common-layout'

const routes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/listing-page/listing-page.module').then((m) => m.ListingPageModule),
        pathMatch: 'full'
      },
      {
        path: 'grant/:entityId',
        loadChildren: () =>
          import('./pages/entity-page/entity-page.module').then((m) => m.EntityPageModule)
      },
      {
        path: 'grant/:entityId/application',
        loadChildren: () =>
          import('./pages/application-page/application-page.module').then((m) => m.ApplicationPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about-page/about-page.module').then((m) => m.AboutPageModule),
        pathMatch: 'full'
      },
      {
        path: 'setting',
        loadChildren: () => import('./pages/setting-page/setting-page.module').then((m) => m.SettingPageModule),
        pathMatch: 'full'
      },
      {
        path: 'setting',
        loadChildren: () => import('./pages/setting-page/setting-page.module').then((m) => m.SettingPageModule),
        pathMatch: 'full'
      },
      {
        path: 'application',
        loadChildren: () => import('./pages/setting-page/setting-page.module').then((m) => m.SettingPageModule),
        pathMatch: 'full'
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/create-entity-page/create-entity-page.module').then((m) => m.CreateEntityPageModule),
        pathMatch: 'full'
      },
      {
        path: 'stylesheet',
        loadChildren: () => import('./pages/stylesheet-page/stylesheet-page.module').then((m) => m.StylesheetPageModule),
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
