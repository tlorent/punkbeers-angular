import { Component, Input } from '@angular/core';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
})
export class BeerDetailComponent {
  @Input() beer: Beer = {
    id: 0,
    image_url: '',
    name: '',
    tagline: '',
  };
  @Input() hasBackButton?: boolean;

  constructor(private beersService: BeersService) { }

  onRemove(beerId: number) {
    this.beersService.removeFav(beerId);
  }

  onAdd(beer: Beer) {
    this.beersService.addFav(beer);
  }
}
