import { Component, OnDestroy, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss'],
})
export class BeersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy {
  beers: Beer[] = [];
  sortBy: 'name' | 'tagline' = 'name';

  constructor(private beersService: BeersService) {
    // Call the parent's constructor (UnsubscribeOnDestroyAdapter) with super()
    // from the child class BeersComponent because we extend the parent class
    super();
  }

  ngOnInit() {
    this.subs.add(
      this.beersService.favsChanged.subscribe((faves) => {
        this.beers = this.beers.map((beer) => ({
          ...beer,
          fav: faves.findIndex((favBeer) => favBeer.id === beer.id) > -1,
        }));
      }),
      this.beersService.fetchBeers().subscribe((beers) => (this.beers = beers)),
      this.beersService.getFaves().subscribe((faves) => {
        this.beers = this.beers.map((beer) => ({
          ...beer,
          fav: faves.findIndex((favBeer) => favBeer.id === beer.id) > -1,
        }));
      })
    );
  }

  onReverse() {
    this.beersService.handleNamesReversed();
  }
}
