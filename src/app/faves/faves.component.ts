import { Component, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.component.html',
  styleUrls: ['./faves.component.scss'],
})
export class FavesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  faves: Beer[] = [];
  error: null | string = null;

  constructor(private beersService: BeersService) {
    super();
  }

  ngOnInit() {
    this.subs.add(
      this.beersService.favsChanged.subscribe((faves) => {
        this.faves = faves;
      }),
      (this.subs.sink = this.beersService.errors.subscribe(
        (error) => (this.error = error)
      )),
      this.beersService.getFaves().subscribe((faves) => (this.faves = faves))
    );
  }

  onUpdateFaves(beer: Beer) {
    this.beersService.addCustomBeer(beer);
  }
}
