import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.component.html',
  styleUrls: ['./faves.component.scss'],
})
export class FavesComponent implements OnInit, OnDestroy {
  faves: Beer[] = [];
  // https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  // What's the best solution?
  subscription!: Subscription;

  constructor(private beersService: BeersService) { }

  ngOnInit(): void {
    this.faves = this.beersService.getFaves();

    // Subscribe to changes of favsChanged, so you have the latest copy of the favourite beers.
    this.subscription = this.beersService.favsChanged.subscribe(() => {
      this.faves = this.beersService.getFaves();
    })
  }

  ngOnDestroy(): void {
    // Unsubscribe from the Subject, otherwise it will continue subscribing for changes
    // and cause memory leaks. Only necessary for subscriptions on custom Subjects,
    // not Angular Subjects like activatedRoute.params.
    this.subscription.unsubscribe();
  }

  onUpdateFaves(beer: Beer): void {
    this.beersService.addCustomFav(beer);
  }
}
