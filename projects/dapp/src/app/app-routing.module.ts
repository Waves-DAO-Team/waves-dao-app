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
        path: environment.routing.home,
        loadChildren: () => import('./pages/landing-page/landing-page.module').then((m) => m.LandingPageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.home,
        loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.listing,
        loadChildren: () => import('./pages/listing-page/listing-page.module').then((m) => m.ListingPageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.about,
        loadChildren: () => import('./pages/about-page/about-page.module').then((m) => m.AboutPageModule),
        pathMatch: 'full'
      },
      {
        path: environment.routing.members,
        loadChildren: () => import('./pages/members-page/members-page.module').then((m) => m.MembersPageModule),
        pathMatch: 'full'
      },
      // {
      //   path: environment.routing.createGrant,
      //   loadChildren: () => import('./pages/create-grant-page/create-grant-page.module').then((m) => m.CreateGrantPageModule),
      //   pathMatch: 'full'
      // },
      // {
      //   path: environment.routing.editGrant,
      //   loadChildren: () => import('./pages/edit-grant-page/edit-grant-page.module').then((m) => m.EditGrantPageModule),
      //   pathMatch: 'full'
      // },
      {
        path: environment.routing.stylesheet,
        loadChildren: () => import('./pages/stylesheet-page/stylesheet-page.module').then((m) => m.StylesheetPageModule),
        pathMatch: 'full'
      },
      // {
      //   path: environment.routing.addReward,
      //   loadChildren: () => import('./pages/add-reward-page/add-reward-page.module').then((m) => m.AddRewardPageModule),
      //   pathMatch: 'full'
      // },
      {
        path: environment.routing.entity,
        loadChildren: () =>
          import('./pages/entity-page/entity-page.module').then((m) => m.EntityPageModule)
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
