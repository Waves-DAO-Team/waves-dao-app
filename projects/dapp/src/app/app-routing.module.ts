import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CommonLayoutComponent } from '@ui/layout/common-layout'
import { environment } from '../environments/environment'

// IMPORTANT
// Get path in template:
// {{ constants.routes.listing | route }} -> 'listing' -> '/listing'
// {{ constants.routes.listing | route: 'param1' }} -> /listing/:id -> /listing/param1
// {{ constants.routes.listing | relativeRoute }}-> 'listing' -> 'listing'
// {{ constants.routes.listing | relativeRoute: 'param1' }} -> 'listing' -> 'listing/param1'
const routes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: environment.routing.listing,
        loadChildren: () => import('./pages/listing-page/listing-page.module').then((m) => m.ListingPageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.entity,
        loadChildren: () =>
          import('./pages/entity-page/entity-page.module').then((m) => m.EntityPageModule)
      },
      {
        path: environment.routing.application,
        loadChildren: () =>
          import('./pages/application-page/application-page.module').then((m) => m.ApplicationPageModule)
      },
      {
        path: environment.routing.about,
        loadChildren: () => import('./pages/about-page/about-page.module').then((m) => m.AboutPageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.setting,
        loadChildren: () => import('./pages/setting-page/setting-page.module').then((m) => m.SettingPageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.create,
        loadChildren: () => import('./pages/create-entity-page/create-entity-page.module').then((m) => m.CreateEntityPageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.stylesheet,
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
