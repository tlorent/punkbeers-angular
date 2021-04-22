import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
})
export class BeerDetailComponent implements OnInit {
  // https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  // What's the best solution?
  @Input() beer!: Beer;
  @Input() hasBackButton?: boolean;

  constructor(private beersService: BeersService) { }

  ngOnInit(): void {}

  onRemove(beerId: number) {
    this.beersService.removeFav(beerId);
  }

  onAdd(beer: Beer) {
    this.beersService.addFav(beer);
  }
}
