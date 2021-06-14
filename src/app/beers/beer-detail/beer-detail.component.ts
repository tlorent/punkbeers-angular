import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../beer';
import { BeersService } from '../../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(400, style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(400, style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class BeerDetailComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @Input() beer: Beer = {
    id: '',
    image_url: '',
    name: '',
    tagline: '',
    key: '',
  };
  // https://angular.io/guide/styleguide#avoid-aliasing-inputs-and-outputs
  @Input() hasBackButton?: boolean;
  namesReversed: boolean = false;

  constructor(private beersService: BeersService) {
    super();
  }

  onAdd(beer: Beer) {
    this.beersService.addFav({ ...beer, fav: true });
  }

  onRemove(beerId: string) {
    this.beersService.removeFav(beerId);
  }

  ngOnInit() {
    this.subs.sink = this.beersService.namesReversedUpdated.subscribe(
      (namesReversed) => (this.namesReversed = namesReversed)
    );
  }
}
