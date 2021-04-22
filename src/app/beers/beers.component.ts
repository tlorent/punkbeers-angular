import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit, OnDestroy {
  beers: Beer[] = [];
  // https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  // What's the best solution?
  subscription!: Subscription;

  constructor(private beersService: BeersService) { }

  ngOnInit() {
    this.beersService.fetchBeers()
      .subscribe(apiData => this.beers = apiData);

    this.subscription = this.beersService.favsChanged.subscribe(() => {
      const faves = this.beersService.getFaves();
      this.beers = this.beers.map((beer) => ({
        ...beer,
        fav: faves.findIndex((favBeer) => favBeer.id === beer.id) > -1
      }))
    })
  }

  ngOnDestroy() {
    // Unsubscribe from the Subject, otherwise it will continue subscribing for changes
    // and cause memory leaks. Only necessary for subscriptions on custom Subjects,
    // not Angular Subjects like activatedRoute.params.
    this.subscription.unsubscribe();
  }
}
