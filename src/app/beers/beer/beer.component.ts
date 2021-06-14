import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Beer } from '../../beer';
import { BeersService } from '../../beers.service';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
})
export class BeerComponent implements OnInit {
  beer?: Beer;

  // ActivatedRoute provides information about a route associated with the component
  // that is currently loaded in the (router) outlet.
  constructor(
    private route: ActivatedRoute,
    private beersService: BeersService
  ) {}

  // https://angular.io/guide/styleguide#member-sequence
  getBeer() {
    // Option 1 to get the id from the route params.
    // this.route.params.subscribe(({ id }) => this.beerId = id);
    // this.beersService.getBeer(this.beerId).subscribe(beer => this.beer = beer[0]);

    // Option 2 to get the id from the route params.
    const id = this.route.snapshot.params['id'];
    this.beer = this.beersService.getBeer(id);
  }

  ngOnInit() {
    this.getBeer();
  }
}
