import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BeerComponent } from './beer/beer.component';
import { BeersComponent } from './beers.component';

const routes: Routes = [
  {
    path: '',
    component: BeersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'beer/:id', component: BeerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeersRoutingModule {}
