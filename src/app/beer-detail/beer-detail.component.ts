import { Component, Input } from '@angular/core';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
})
export class BeerDetailComponent extends UnsubscribeOnDestroyAdapter {
  @Input() beer: Beer = {
    id: 0,
    image_url: '',
    name: '',
    tagline: '',
  };
  // Alias for custom property.
  @Input('backButton') hasBackButton?: boolean;
  namesReversed: boolean = false;

  constructor(private beersService: BeersService) {
    super();
    this.subs.sink = this.beersService.namesReversedUpdated.subscribe(
      (namesReversed) => (this.namesReversed = namesReversed)
    );
  }

  onRemove(beerId: number) {
    this.beersService.removeFav(beerId);
  }

  onAdd(beer: Beer) {
    this.beersService.addFav(beer);
  }
}
