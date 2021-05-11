import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { FavesComponent } from './faves/faves.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'beers',
    loadChildren: () =>
      import('./beers/beers.module').then((mod) => mod.BeersModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  { path: 'faves', component: FavesComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

// https://angular.io/guide/architecture-modules#ngmodule-metadata
@NgModule({
  // forRoot: configures the router at the application's root level.
  // It supplies the service providers and directives needed for routing.

  // preloadingStrategy: use lazy-loading but preload asap.
  // PreloadAllModules does exactly what it says, so in a large app this would make lazyloading redundant.
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],

  /*
    exports: the subset of declarations that should be visible and usable in the component
    templates of other modules. aka, what do other components need from this module
    when they import this module?
    make the RouterModule available throughout the app,
    i.e. any other module that imports AppRoutingModule needs RouterModule so export it.
  */
  exports: [RouterModule],
})
export class AppRoutingModule {}
