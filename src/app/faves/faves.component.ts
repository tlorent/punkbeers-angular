import { Component, OnInit } from '@angular/core';
import { Beer } from '../beer';
import { BeersService } from '../beers.service';
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-faves',
  templateUrl: './faves.component.html',
  styleUrls: ['./faves.component.scss'],
})
export class FavesComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  faves: Beer[] = [];

  constructor(private beersService: BeersService) {
    super();
    this.subs.sink = this.beersService.favsChanged.subscribe(() => {
      this.faves = this.beersService.getFaves();
    })
  }

  ngOnInit(): void {
    this.faves = this.beersService.getFaves();
  }

  onUpdateFaves(beer: Beer): void {
    this.beersService.addCustomFav(beer);
  }
}
