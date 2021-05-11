import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../beer';
import { BeersService } from '../../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
})
export class BeerDetailComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  @Input() beer: Beer = {
    id: '',
    image_url: '',
    name: '',
    tagline: '',
    key: '',
  };
  // Alias for custom property.
  @Input('backButton') hasBackButton?: boolean;
  namesReversed: boolean = false;

  constructor(private beersService: BeersService) {
    super();
  }

  ngOnInit() {
    this.subs.sink = this.beersService.namesReversedUpdated.subscribe(
      (namesReversed) => (this.namesReversed = namesReversed)
    );
  }

  onAdd(beer: Beer) {
    this.beersService.addFav({ ...beer, fav: true });
  }

  onRemove(beerId: string) {
    this.beersService.removeFav(beerId);
  }
}
