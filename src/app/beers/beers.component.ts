import { Component, OnDestroy, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy {
  beers: Beer[] = [];

  constructor(private beersService: BeersService) {
    super();
    this.subs.sink = this.beersService.favsChanged.subscribe(() => {
      const faves = this.beersService.getFaves();
      this.beers = this.beers.map((beer) => ({
        ...beer,
        fav: faves.findIndex((favBeer) => favBeer.id === beer.id) > -1
      }))
    })
  }

  ngOnInit() {
    // TODO: Convert to reactive style?
    this.beersService.fetchBeers()
      .subscribe(apiData => this.beers = apiData);
  }
}
