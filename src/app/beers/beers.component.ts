import { Component, OnDestroy, OnInit } from '@angular/core';
import { triggerAnimation } from '../animations';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss'],
  animations: [
    // trigger('openClose', [
    //   state(
    //     'open',
    //     style({
    //       opacity: 1,
    //       backgroundColor: 'yellow',
    //     })
    //   ),
    //   state(
    //     'inProgress',
    //     style({
    //       opacity: 0.1,
    //       backgroundColor: 'orange',
    //     })
    //   ),
    //   state(
    //     'closed',
    //     style({
    //       opacity: 0.5,
    //       backgroundColor: 'green',
    //     })
    //   ),
    //   transition('open <=> closed', [animate('0.3s ease-in')]),
    // ]),
    triggerAnimation,
  ],
})
export class BeersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnDestroy
{
  beers: Beer[] = [];
  sortBy: 'name' | 'tagline' | 'id' = 'name';
  isReversed: boolean = false;
  // inProgress: boolean = false;

  onReverse() {
    this.beersService.handleNamesReversed();
    this.isReversed = !this.isReversed;

    // this.inProgress = !this.inProgress;
    // setTimeout(() => {
    //   this.beersService.handleNamesReversed();
    //   this.isReversed = !this.isReversed;
    //   this.inProgress = !this.inProgress;
    // }, 2000);
  }

  onAnimation(event: AnimationEvent) {
    console.log(event);
  }

  sortBeers(propName: 'name' | 'tagline' | 'id', beers: Beer[]): Beer[] {
    if (beers.length > 0) {
      return beers.sort((a, b) => {
        let valA = a[propName].toLowerCase();
        let valB = b[propName].toLowerCase();

        if (valA < valB) {
          return -1;
        }
        if (valA > valB) {
          return 1;
        }
        return 0;
      });
    } else {
      return beers;
    }
  }

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
      this.beersService
        .fetchBeers()
        .subscribe(
          (beers) =>
            (this.beers = this.beers = this.sortBeers(this.sortBy, beers))
        ),
      this.beersService.getFaves().subscribe((faves) => {
        this.beers = this.beers.map((beer) => ({
          ...beer,
          fav: faves.findIndex((favBeer) => favBeer.id === beer.id) > -1,
        }));
      })
    );
  }
}
