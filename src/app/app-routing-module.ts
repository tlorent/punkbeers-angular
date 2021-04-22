import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BeerComponent } from "./beer/beer.component";
import { BeersComponent } from "./beers/beers.component";
import { FavesComponent } from "./faves/faves.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SearchComponent } from "./search/search.component";

// 1. Define routes.
// 1.1 Home
// 1.2 Beers (shows 25 beers of the Punk API)
// 1.3 Favourites (shows favourited beers)
// 1.4 Search (form to search for specific beers)
// 1.5 Detail page of beer (parameterized route)
// 1.6 Wildcard route, any non-existing page should show a witty 404 page
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'beers', component: BeersComponent },
  { path: 'faves', component: FavesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'beer/:id', component: BeerComponent },
  { path: '**', component: NotFoundComponent }
]

// https://angular.io/guide/architecture-modules#ngmodule-metadata
// 2. Create the routing module.
@NgModule({
  // forRoot: configures the router at the application's root level.
  // It supplies the service providers and directives needed for routing.
  imports: [RouterModule.forRoot(routes)],

  // exports: the subset of declarations that should be visible and usable in the component
  // templates of other modules. aka, what do other components need from this module
  // when they import this module?

  // make the RouterModule available throughout the app,
  // i.e. any other module that imports AppRoutingModule needs RouterModule so export it.
  exports: [RouterModule]
})
export class AppRoutingModule {}
