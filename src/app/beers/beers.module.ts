import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BeerFormComponent } from './beer-form/beer-form.component';
import { BeerComponent } from './beer/beer.component';
import { BeersRoutingModule } from './beers-routing.module';
import { BeersComponent } from './beers.component';

@NgModule({
  declarations: [BeersComponent, BeerComponent],
  // make these shared?
  imports: [SharedModule, BeersRoutingModule],
  /*
    If you also import any components in the declarations file
    in modules that you import in this module (e.g. BeersRoutingModule),
    then you don't have to export them again in this module if you use
    them internally (not in any other module).
   */
  exports: [BeerFormComponent, BeerComponent],
})
export class BeersModule {}
